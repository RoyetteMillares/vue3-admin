/**
 * @author django
 * @description 请求接口统一出口
 */
import service from "./service";
import { Apis } from "./apis";
import { trim, deleteKey } from '../utils/formatParams';

export function $post(href: keyof typeof Apis, data?: any) {
  const url = Apis[href];
  const params = data ? trim(deleteKey({ ...data })) : {};
  return service.post(url, params);
}

export function $get(href: keyof typeof Apis, params: any) {
  const url = Apis[href];
  if (params) params = trim(deleteKey({ ...params }));
  return service.get(url, {
    params,
    // paramsSerializer: (params:any) => {
    //   return qs.stringify(params, { indices: false });
    // },
  });
}

export function $upload(href: keyof typeof Apis, params: any, config) {
  const url = Apis[href];
  return service.post(url, params, config);
}