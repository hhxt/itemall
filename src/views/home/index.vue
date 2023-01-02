<template>
  <div class="home">
    <van-sticky>
      <nav-bar ref="navBarRef" :bg-color="getBgColor">
        <template #left>
          <van-icon name="scan" :color="getIconColor" />
        </template>
        <template #center>
          <div class="search">
            <van-icon name="search" size="16" />
            <span>搜索</span>
          </div>
        </template>
        <template #right>
          <van-icon name="chat-o" :color="getIconColor" />
        </template>
      </nav-bar>
    </van-sticky>

    <div class="swipe-container">
      <van-swipe class="swipe" :autoplay="3000" indicator-color="#00bfc0">
        <template v-for="item in banner">
          <van-swipe-item :key="item.id">
            <img :src="item.image" />
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
    <recommend :recommend="recommend" ref="recommendRef" />
    <featured />
    <van-sticky :offset-top="navBarHeight">
      <tab ref="tabRef">
        <template v-for="item in tabs">
          <tab-item
            :key="item.type"
            :class="{ active: item.type === currentGoodsType }"
            @click.native="handleToggleTab(item.type)"
          >
            <span class="title">
              {{ item.title }}
            </span>
          </tab-item>
        </template>
      </tab>
    </van-sticky>

    <waterfall :list="getList" :breakpoints="breakpoints" imgSelector="show.img">
      <template #item="{ item, index }">
        <div class="goods" :key="index">
          <img class="image" :src="item.show.img" width="100%" />
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <span class="info-price">{{ item.price | formatPrice }}</span>
            <span class="info-cfav">
              <van-icon name="star-o" />
              {{ item.cfav }}
            </span>
          </div>
        </div>
      </template>
    </waterfall>
    <div class="loading" ref="loadingRef">
      <van-loading type="spinner" color="#00bfc0" size="16" vertical>加载中...</van-loading>
    </div>
    <back-top v-if="scrollTop > tabTop" @click.native="backTop" />
  </div>
</template>

<script>
import { Waterfall } from 'vue-waterfall-plugin';
import 'vue-waterfall-plugin/style.css';
import { queryBanner, queryRecommend, queryGoods } from '@/api';
import NavBar from '@/components/nav-bar';
import Recommend from '@/components/recommend';
import Featured from '@/components/featured';
import Tab from '@/components/tab';
import TabItem from '@/components/tab-item';
import BackTop from '@/components/backtop';
export default {
  components: { Waterfall, NavBar, Recommend, Featured, Tab, TabItem, BackTop },
  data: () => ({
    // 轮播
    banner: [],
    // 热门推荐
    recommend: [],
    // tab
    tabs: [
      {
        title: '最新',
        type: 'new',
      },
      {
        title: '流行',
        type: 'pop',
      },
      {
        title: '精选',
        type: 'sell',
      },
    ],
    // 商品数据
    goods: {
      new: { page: 1, list: [] },
      pop: { page: 1, list: [] },
      sell: { page: 1, list: [] },
    },
    // 当前商品类型
    currentGoodsType: 'new',
    // navBar高度
    navBarHeight: 0,
    tabTop: 0,
    // 滚动top值
    scrollTop: 0,
    // 热门推荐的top值
    recommendTop: 0,
    // 是否正在加载
    loading: false,
    // 自定义行显示个数，主要用于对移动端的适配
    breakpoints: {
      1200: {
        //当屏幕宽度小于等于1200
        rowPerView: 4,
      },
      800: {
        //当屏幕宽度小于等于800
        rowPerView: 3,
      },
      500: {
        //当屏幕宽度小于等于500
        rowPerView: 2,
      },
    },
  }),
  mounted() {
    this.queryBanner();
    this.queryRecommend();

    this.queryGoods('new');
    this.queryGoods('pop');
    this.queryGoods('sell');

    // 获取挂载后的navBar高度
    this.navBarHeight = this.$refs.navBarRef.$el.offsetHeight;
    // 获取tab的top值
    this.tabTop = this.$refs.tabRef.$el.offsetTop;
    // 获取热门推荐的top值
    this.recommendTop = this.$refs.recommendRef.$el.offsetTop;

    // 加载更多数据
    this.loadmore();
    // 监听滚动事件
    this.scorll();
  },
  computed: {
    getList() {
      return this.goods[this.currentGoodsType].list;
    },
    getBgColor() {
      return this.scrollTop > this.recommendTop ? '#00bfc0' : '#ffffff';
    },
    getIconColor() {
      return this.scrollTop > this.recommendTop ? '#ffffff' : '#333333';
    },
  },
  methods: {
    /** 查询轮播 */
    async queryBanner() {
      this.banner = await queryBanner();
    },
    /** 查询热门推荐 */
    async queryRecommend() {
      this.recommend = await queryRecommend();
    },
    /** 查询商品的 */
    async queryGoods(type) {
      this.loading = true;
      // 获取当前商品类型的页码数
      const page = this.goods[type].page;
      // 查询商品数据
      const goods = await queryGoods({ type, page });
      // 处理图片数据
      goods.forEach((_) => (_.show = JSON.parse(_.show)));
      // 将商品数据添加到对应的商品类型中
      this.goods[type].list.push(...goods);
      // 页码数发生变化
      this.goods[type].page++;
      this.loading = false;
    },
    /** 滚动加载数据 */
    loadmore() {
      // 创建IntersectionObserver对象
      const intersectionObserver = new IntersectionObserver(([entity]) => {
        // 判断是否进入可视区域 && 是否正在加载
        if (entity.isIntersecting && !this.loading) {
          // 加载数据
          this.queryGoods(this.currentGoodsType);
        }
      });
      // 监听loading元素是否进入可视区域
      intersectionObserver.observe(this.$refs.loadingRef);
    },
    /** 监听滚动 */
    scorll() {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      });
    },
    /** 返回顶部 */
    backTop() {
      // 平滑滚动
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    /** 切换商品类型 */
    handleToggleTab(type) {
      this.currentGoodsType = type;
    },
  },
  filters: {
    formatPrice(price) {
      return '￥' + price.toFixed(2);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  background: @theme-light-gray;
  min-height: 100vh;
}
.search {
  height: 50px;
  background: @theme-light-gray;
  border-radius: 50px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 24px;
  color: @theme-dark-gray;
  span {
    margin-left: 4px;
  }
}
.swipe-container {
  padding: 16px;
  .swipe {
    height: 370px;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.active {
  color: @theme-primary;
  font-weight: 600;
  .title {
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: @theme-primary;
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translate(-50%, 0);
    }
  }
}
.goods {
  padding: 16px;
  line-height: 1.5;
  text-align: center;
  .image {
    border-radius: 4px;
  }
  .title {
    font-size: 14px;
    color: @theme-dark-gray;
    // 指定行数
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .info {
    font-size: 28px;
    &-price {
      color: red;
      font-weight: 600;
    }
    &-cfav {
      color: @theme-dark-gray;
      margin-left: 24px;
    }
  }
}
.loading {
  padding: 50px 0;
}
</style>
