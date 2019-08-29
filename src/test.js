/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-29 21:32:42
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const test1 = [0,1,0,3,12];
var moveZeroes1 = function(nums) {
    let len = nums.length;
    for(let i=0;i<len;i+=1) {
        if(nums[i] === 0) {
            for(let j=i+1;j<len;j+=1) {
                nums[j-1] = nums[j];
            }
            i-=1;
            nums[--len] = 0;
        }
    }
};
// moveZeroes(test1);
var moveZeroes1 = function(nums) {
    let zerocount = 0;
    for(let i=0;i<nums.length;i+=1) {
        if(nums[i] === 0) {
            nums.splice(i,1);
            i-=1;
            zerocount+=1;
        }
    }
    if(zerocount) {
        nums.push(...Array(zerocount).fill(0)) 
    }
};