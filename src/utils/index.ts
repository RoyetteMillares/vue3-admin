/* eslint-disable prefer-const */
/* eslint-disable camelcase */
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

// scrollTop animation
/**
 *
 * @param el 元素
 * @param from 从某个位置
 * @param to 到某个位置
 * @param duration
 * @param endCallback
 */

export function scrollTop(
  el: any,
  from = 0,
  to: number,
  duration = 500,
  endCallback: any
) {
  const win: any = window;
  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame =
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.msRequestAnimationFrame ||
      function (callback: any) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start: number, end: number, step: number) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}

/**返回剩余时间**/
export const surplusTime = (endTime: number, startTime: number) => {
  const sy_time = endTime - startTime;
  // console.log(endTime, startTime, sy_time)
  let sy_h, sy_m, sy_s;
  sy_h = Math.floor((sy_time % (24 * 60 * 60)) / (60 * 60)) || 0; //剩余小时
  sy_s = Math.floor(((sy_time % (24 * 60 * 60)) % (60 * 60)) % 60) || 0; // 剩余秒
  sy_m = Math.floor(((sy_time % (24 * 60 * 60)) % (60 * 60)) / 60) || 0; // 剩余分
  if (sy_time <= 0) {
    return "00:00:00";
  } else {
    return `${sy_h >= 10 ? sy_h : `0${sy_h}`} : ${
      sy_m >= 10 ? sy_m : `0${sy_m}`
    } : ${sy_s >= 10 ? sy_s : `0${sy_s}`}`;
  }
};
