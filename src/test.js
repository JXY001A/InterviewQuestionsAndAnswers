/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-29 13:30:35
 */

/**
 * @param {number[]} digits
 * @return {number[]}
 */
const test1 = [1,2,3];
const test2 = [4,3,2,1];
const test3 = [9,9,9,9,9];
var plusOne = function(digits) {
    if(!digits.length) return digits;
    
    let isTen = false;
    digits[digits.length-1] += 1;

    for(let i=digits.length-1;i>=0;i-=1) {
        if(digits[i] === 10) {
            isTen = true;
            digits[i] = 0;
            if(digits[i-1]) digits[i-1] +=1;
        }else{
            isTen = false;
            break;
        }
    } 
    if(isTen) {
        digits.unshift(1);
    }
    return digits;
};