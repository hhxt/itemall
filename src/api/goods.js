import { http } from '@/plugins/axios';

/** 查询商品数据 */
export const queryGoods = (params) => {
  // ?type=xxx&page=xxx 前/后端 query参数  axios单独的字段去表示query  params {type:'xxx',page:1}
  return http({ url: '/goods', params: { take: 30, ...params } });
};
