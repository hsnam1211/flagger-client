import { AxiosResponse, Method } from 'axios';
import { ApiResponseType } from '../type';
import { CustomAxios } from './customAxios';
import Cookies from 'js-cookie';

export default async function CustomRestApi(
  method: Method,
  url: string,
  apiVersion = '0',
  params?: {}
): Promise<ApiResponseType> {
  try {
    const [token, refreshToken] = await Promise.all([
      Cookies.get('STYLEMATE_AUTH_TOKEN'),
      Cookies.get('STYLEMATE_AUTH_REFRESH'),
    ]);
    const headers = {
      'content-type': 'application/json; charset=UTF-8',
      accept: '*/*',
      // 'st-api-version': apiVersion,
      Authorization: `Bearer ${token}`,
    };

    let result: AxiosResponse | null = null;
    switch (method.toLowerCase()) {
      case 'get':
        result = await CustomAxios.get(url, { params, headers });
        break;
      case 'post':
        result = await CustomAxios.post(url, params, { headers });
        break;
      case 'put':
        result = await CustomAxios.put(url, params, { headers });
        break;
      case 'delete':
        result = await CustomAxios.delete(url, { data: params, headers });
        break;
    }

    if (result?.data) {
      return result?.data as ApiResponseType;
    }
  } catch (e) {
    console.log(e);
  }

  return { code: 0, message: '죄송합니다 잠시후에 이용해주세요.' };
}
