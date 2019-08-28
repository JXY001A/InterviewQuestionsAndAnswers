/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-28 13:32:42
 */

 /**
 * @desc leetcode 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    if(!Array.isArray(prices) || !prices.length) return maxProfit;
    for(let i=0;i<prices.length-1;i+=1) {
        if(prices[i]<prices[i+1]) {
            maxProfit += prices[i+1] - prices[i];
        }
    }

    return maxProfit;
};