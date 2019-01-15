/**
 *@author Create by zhoulujun.cn
 *@version 1.0.0
 *@description 通用方法类
 */


class Untils {




  /**
   *debounce 将若干个函数调用合成 一次，并在给定时间过去之后仅被调用一次。
   * @param func {Function} 防止抖动函数
   * @param delay {number} 延迟时间，限制下次函数调用之前必须等待的时间间隔（只有当高频事件停止，最后一次事件触发的超时调用才能在delay时间后执行）
   * @param immediate {number} 延迟执行时间
   * @returns {Function} 绑定的函数实际上是debounce内部返回的函数
   */
  static debouce (func, delay, immediate) {
    let timer = null;
    return function () {
      let context = this;
      let args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      if (immediate) {
        //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
        let doNow = !timer;
        //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
        timer = setTimeout(function () {
          timer = null;
        }, delay);
        //立即执行
        if (doNow) {
          func.apply(context, args);
        }
      } else {
        timer = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      }
    };
  }

  /**
   *throttle 允许一个函数在规定的时间内只执行一次
   * @param func {Function}
   * @param delay {number} 间隔时间
   * @returns {Function}
   */
  static throttle (func, delay) {
    let timer = null;
    let startTime = Date.now();
    return function () {
      let curTime = Date.now();
      let remaining = delay - (curTime - startTime);
      let context = this;
      let args = arguments;

      clearTimeout(timer);
      if (remaining <= 0) {
        func.apply(context, args);
        startTime = Date.now();
      } else {
        timer = setTimeout(function () {
          func.apply(context, args);
        }, remaining);
      }
    };


  }

  /**
   *帧动画节流
   * @param fn {Function}
   * @returns {Function}
   */
  static raf_debounce (fn) {
    let ticking = false;
    return function () {
      let context = this;
      let args = arguments;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          fn && fn.apply(context, args);
        });
      }
    };
  }

  /**
   * 获取URl参数
   * @param search {string} url参数
   * @return {object}
   */
  static getUrlParams(search=location.search){
    //获取URL参数
    let urlParams={};

    try {
      search.replace(/([^&=?]+)=([^&=?]*)/,function (str,$1,$2) {
        urlParams[$1]=$2;
        return str;
      });

    }catch (e) {
      console.log(e);
    }
    return urlParams;
  }

}

export default Untils;
