/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-28 12:50:01
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const nums = [0,0,1,1,1,2,2,3,3,4];
const result = [0, 1, 2, 3, 4];
var removeDuplicates = function(nums) {
    if(Array.isArray(nums) || nums.length) return ;

    for(let i=1;i<nums.length;i+=1) {
        if(nums[i] === nums[i-1]) {
            nums.splice(i,1);
            i = i-1;
        }
    }
    console.log(nums);
    return nums.length;
};

removeDuplicates(nums);