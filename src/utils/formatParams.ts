/**
 * @author django
 * @description 处理请求参数
 */
/**
 * 删除为空的key
 * @param data 传入对象
 * @return 返回删除后的对象
 */
export function deleteKey(data: any) {
  if (!data) return "";
  const obj = data;
  Object.keys(obj).forEach((item) => {
    // 对象类型 继续递归
    if (Object.prototype.toString.call(item) === "[Object Object]") {
      if (typeof obj[item] !== "string") deleteKey(obj[item]);
    } else {
      if (obj[item] === null || obj[item] === "" || obj[item] === " ") {
        delete obj[item];
      } else {
        if (typeof obj[item] === "string") {
          obj[item] = obj[item].replace(/(^\s*)|(\s*$)|\n/g, "");
        }
      }
    }
  });
  if (Object.keys(obj).length) {
    return obj;
  } else {
    return {};
  }
}

/**
 * @description 清除字段前后的空格
 * @param data
 * @return {string|*}
 */
export function trim(data: { [x: string]: any }) {
  if (!data) return "";
  const obj = data;
  Object.keys(obj).forEach((item) => {
    if (Object.prototype.toString.call(item) === "[Object Object]") {
      if (typeof obj[item] !== "string") trim(obj[item]);
    } else if (Array.isArray(obj[item]) && obj[item].length) {
      obj[item].forEach((val: any, i: number) => {
        // 对象数组
        if (Object.prototype.toString.call(val) === "[object Object]") {
          trim(val);
        } else {
          if (typeof val === "string")
            obj[item][i] = val.replace(/(^\s*)|(\s*$)|\n/g, "");
        }
      });
    } else {
      if (typeof obj[item] === "string") {
        if (obj[item]) obj[item] = obj[item].replace(/(^\s*)|(\s*$)|\n/g, "");
      }
    }
  });
  return obj;
}
