<template>
  <div class="register">
    <van-sticky>
      <nav-bar ref="navBarRef">
        <template #center> 注册 </template>
      </nav-bar>
    </van-sticky>
    <div class="form" :style="{ height: `calc(100vh - ${navBarHeight}px)` }">
      <van-form label-align="right" colon>
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="userInfo.avatar" />
          </template>
        </van-field>
        <van-field
          v-model="userInfo.nickName"
          name="nickName"
          label="昵称"
          placeholder="请输入昵称"
        />
        <van-field
          v-model="userInfo.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="mini" type="primary" color="#00bfc0">发送验证码</van-button>
          </template>
        </van-field>
        <van-field
          v-model="userInfo.password"
          name="password"
          label="密码"
          placeholder="请输入密码"
        />
        <van-field v-model="userInfo.email" name="email" label="邮箱" placeholder="请输入邮箱" />
        <van-field name="gander" label="性别">
          <template #input>
            <van-radio-group v-model="userInfo.gander" direction="horizontal">
              <van-radio name="1" checked-color="#00bfc0">男</van-radio>
              <van-radio name="2" checked-color="#00bfc0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" size="small" color="#00bfc0">
            提交
          </van-button>
          <div class="link">
            已有账号，去
            <router-link to="/login">登陆</router-link>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    userInfo: {
      avatar: [],
      gander: '1',
      nickName: '',
      phone: '',
      password: '',
      email: '',
    },
    navBarHeight: 0,
    sms: '',
  }),
  mounted() {
    // 获取挂载后的navBar高度
    this.navBarHeight = this.$refs.navBarRef.$el.offsetHeight;
  },
};
</script>

<style lang="less" scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
  color: @theme-gray;
}
</style>
