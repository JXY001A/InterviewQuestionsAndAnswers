/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-31 13:59:55
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const min = -Math.pow(2,31);
    const max = Math.pow(2,31)  - 1; 
    const symbol = x>=0?1:-1;
    x = (symbol * x) + '';

    if(x.length<=1) return x;
    
    let nums = x.split('').reverse(); 
    let zeroIndex = -1;
    for(let i=0,len=nums.length;i<len && nums[i] == 0;i+=1) {
        zeroIndex+=1;
    }
    const result  = parseInt(nums.slice(zeroIndex+1,nums.length).join(''),10) * symbol;
    return (result>max || result < min)?0:result;
};