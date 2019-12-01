/*
 * @description: 防抖实现 
 * @author: JXY
 * @Date: 2019-12-01 17:04:16
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-12-01 17:52:37
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
            clearTimeout(timer);
        }
    }
}

/* 防抖于懒加载结合 */
const lazyload = ()=>{
    // 获取所有的图片标签
    const imgs = document.getElementsByTagName('img');
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
    let num = 0;
    return function (){
        for(let i=num; i<imgs.length; i++) {
            // 用可视区域高度减去元素顶部距离可视区域顶部的高度
            let distance = viewHeight - imgs[i].getBoundingClientRect().top
            // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
            if(distance >= 0 ){
                // 给元素写入真实的src，展示图片
                imgs[i].src = imgs[i].getAttribute('data-src')
                // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                num = i + 1
            }
        }
    }
}


const scroll_best = throttleDebounce(lazyload(),500);
window.addEventListener('scroll',scroll_best);
