import { http } from '@/plugins/axios';

/** 查询轮播数据 */
export const queryBanner = () => {
  return http({ url: '/home/banner' });
};

/** 查询热门推荐数据 */
export const queryRecommend = () => {
  return http({ url: '/home/recommend' });
};
