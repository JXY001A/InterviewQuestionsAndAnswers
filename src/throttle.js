/*
 * @description: 节流  throttle
 * @author: JXY
 * @Date: 2019-12-01 15:00:22
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-12-01 17:03:42
 */




const throttle = (fn,interval)=>{
    // last为上一次触发回调的时间
    let last = 0;
    return function () {
        const context = this;
        const now = + new Date;
        const args = arguments;
        
        if(now-last >= interval) {
            fn.apply(context,args);
        }
    } 
}

const load = ()=>{
    // 获取所有的图片标签
    const imgs = document.getElementsByTagName('img');
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
    let num = 0;
    function lazyload(){
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


// 用throttle来包装scroll的回调
const better_scroll = throttle(load(), 100);

window.addEventListener('scroll', better_scroll, false);
// 监听Scroll事件
