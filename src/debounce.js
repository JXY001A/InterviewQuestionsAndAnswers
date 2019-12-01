/*
 * @description: 防抖实现 
 * @author: JXY
 * @Date: 2019-12-01 17:04:16
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-12-01 17:47:44
 */

// 短时间内进入大量任务，为每个认为有开启定时器，后一个覆盖前一个，直到在设定的延迟时间内没有新任务进入的时候，当前定时器的任务就会执行
const debounce = (fn,delay) => {
    let timer = null;
    return function() {
        let context = this;
        const args = arguments;
        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function() {
            fn.apply(context,args)
        },delay);
    }
}

// 看防抖的代码就会发现 一个问题，如果连续大量的任务被发起，且间隔都小于给定的延迟时间，那么在一段时间被任务时不会响应的。于是就需要为防抖设置一个底线，在一定的时间内一定执行一个任务。
/**
 * @description: 使用 节流优化防抖 
 * @author: JXY
 * @param {type} 
 * @return: 
 * @Date: 2019-12-01 17:29:20
 */

const throttleDebounce = (fn,delay)=>{
    let timer = null,
        last = 0;

    return function() {
        const args = arguments,
              context = this,
              now = + new Date;

        if(now - last < delay) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                // 只要定时器不执行那么，last 则一直都是最初的那个
                last = now
                fn.apply(context,args);
            },delay);
        }else{
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            fn.apply(context,args);
            last = now;
        }
    }
}
