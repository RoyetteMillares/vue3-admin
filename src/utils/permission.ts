//獲取token
export const getToken = () => {
  return storage().Token;
};
// 设置token
export const setToken = (token: string) => {
  storage().Token = token;
};
export const clearToken = () => {
  storage().removeItem("Token");
};

/**
 *返回存储字段名
 */
export function storage() {
  return window.sessionStorage;
  // if (process.env.VUE_APP_STORAGE == "LOCAL") {
  //   return localStorage;
  // } else if (process.env.VUE_APP_STORAGE == "SESSION") {
  //   return sessionStorage;
  // }
}
