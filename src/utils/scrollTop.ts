/**
 * 删除为空的key
 * @param data 传入对象
 * @return 返回删除后的对象
 */
export function deleteKey(data: any) {
  if (!data) return "";
  const obj = data;
  Object.keys(obj).forEach((item) => {
    if (item == "data") {
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

export function trim(data: any) {
  if (!data) return "";
  const obj = data;
  Object.keys(obj).forEach((item) => {
    if (item == "data") {
      if (typeof obj[item] !== "string") trim(obj[item]);
    } else if (Array.isArray(obj[item]) && obj[item].length) {
      obj[item].forEach((val: any, i: number) => {
        // console.log(Object.prototype.toString.call(val), 90909);
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

/**
 * @author django
 * @description 比较两个对象的key value
 * @param oldObj {Object} 旧的对象
 * @param newObj {Object} 新的对象
 */
export const compareObject = (newObj: any, oldObj: any) => {
  const newArr = Object.keys(newObj);
  const oldArr = Object.keys(oldObj);
  const obj: any = {};
  newArr.forEach((item) => {
    oldArr.forEach((val) => {
      if (item === val) {
        if (newObj[item] !== oldObj[item]) {
          obj[item] = newObj[item];
        }
      }
      if (!oldArr.includes(item)) {
        obj[item] = newObj[item];
      }
    });
  });
  return obj;
};

/**
 * @author django
 * @description 滑动 缓动函数
 * @param el 滚动条的目标元素
 * @param from 起始位置
 * @param to 到达位置
 * @param duration 动画时间
 * @param endCallback 回调函数
 * @param scrollWay 滚动方式
 */
// scrollTop animation
export function moveScroll(
  el: any,
  from = 0,
  to: number,
  scrollWay = "scrollTop",
  duration = 500,
  endCallback: Function
) {
  const win: any = window;
  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame =
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.msRequestAnimationFrame ||
      function (callback: Function) {
        return win.setTimeout(callback, 1000 / 60);
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
      el[scrollWay] = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}
