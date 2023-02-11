export const checkPassword = (value: any) => {
  const regexAz = /^(?=.*[A-Z].*)(?=.*[a-z].*).{8,}$/;
  const regexSpl = /^(?=.*[`~!@#$%^&*()_\-+=<>.?:"{}].*).{8,}$/;
  if (!value) return "Please input new Password";
  if (value.length < 8) return "Should be atleast 8 characters";
  if (!regexAz.test(value))
    return "Should combination of small and capital letters";
  if (!regexSpl.test(value)) return "Should have atleast 1 special character";
  return true;
};
export function isMobile(str: any) {
  // let mobile = /^1[34578][0-9]\d{8}$/
  const mobile = /^[0-9]{8,11}$/;
  return mobile.test(str);
}
export function isEmail(str: any) {
  const code = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return code.test(str);
}
export function isCode(str: any) {
  const code = /^[0-9]{6}$/;
  return code.test(str);
}
