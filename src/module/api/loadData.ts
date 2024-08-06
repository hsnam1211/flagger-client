import { Method } from 'axios';
import CustomRestApi from './customRestApi';

export const loadData = async (
  method: Method,
  url: string,
  version: string,
  params?: {}
) => {
  try {
    return await CustomRestApi(method, url, version, params);
  } catch (error) {
    console.log(error);
    return { code: 0, message: '에러가 발생했습니다.' };
  }
};
