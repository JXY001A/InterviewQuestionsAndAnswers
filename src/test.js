/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-28 22:14:39
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let commons = [];
    let maxLengthNums = nums1.length >= nums2.length ? nums1 : nums2;
    let minLengthNums = nums1.length < nums2.length ? nums1 : nums2;
    for(let i=0,len=maxLengthNums.length;i<len;i+=1) {
        let index = minLengthNums.indexOf(maxLengthNums[i]);
        if( index>= 0) {
            commons.push(maxLengthNums[i]);
            minLengthNums.splice(index,1);
        }
    }
    return commons;
};