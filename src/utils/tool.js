// debounce.js
// 防抖函数会在事件触发后延迟执行
export function debounce(func, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 节流函数会在指定的时间间隔内只执行一次事件处理函数。
export function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 在.VUE文件中的使用方式
// import { debounce, throttle } from './debounce-throttle'; // 路径根据实际情况调整

// export default {
//   name: 'DebounceThrottleExample',
//   setup() {
//     // 使用防抖函数
//     const debouncedInputHandler = debounce((event) => {
//       console.log('Debounced input:', event.target.value);
//     }, 500); // 延迟500毫秒

//     // 使用节流函数
//     const throttledInputHandler = throttle((event) => {
//       console.log('Throttled input:', event.target.value);
//     }, 1000); // 每1000毫秒执行一次

//     return {
//       debouncedInputHandler,
//       throttledInputHandler
//     };
//   }
// };