/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-28 13:32:42
 */
/**
 * @param {number[]} prices
 * @return {number}
 */


let test1 = [7,1,5,3,6,4];
let test2 = [1,2,3,4,5];
let test3 = [7,6,4,3,1];
var maxProfit = function(prices) {
    let maxProfit = 0;
    if(!Array.isArray(prices) || !prices.length) return;
    for(let i=0;i<prices.length-1;i+=1) {
        if(prices[i]<prices[i+1]) {
            maxProfit += prices[i+1] - prices[i];
        }
    }

    return maxProfit;
};

maxProfit(test1)
maxProfit(test2)
maxProfit(test3)