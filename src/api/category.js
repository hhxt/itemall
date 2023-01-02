import { http } from '@/plugins/axios';

/** 查询分类 */
export const queryCategory = () => {
  return http({ url: '/category' });
};

/** 查询二级分类 */
export const querySubCategory = (maitKey) => {
  return http({ url: `/category/${maitKey}` });
};
