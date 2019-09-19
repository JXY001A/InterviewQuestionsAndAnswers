/*
 * @description: 
 * @author: JXY
 * @Date: 2019-09-18 22:15:38
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-09-19 22:18:14
 */
/**
 * @ leetcode  三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const result = [];
    if(nums.length<3) return result;
    
    nums.sort((a,b)=>a-b);
    
    for(let i=0;i<nums.length;i+=1) {
        if(i>0 && nums[i] === nums[i-1]) continue;
        left = i+1;
        right = nums.length-1;
        
        while(left<right) {
            if(nums[i] + nums[left] + nums[right] === 0) {
                result.push([nums[i],nums[left],nums[right]]);
                while(nums[left] === nums[left+1]) left+=1;
                while(nums[right] === nums[right-1]) right-=1;
                
                left+=1;
                right-=1;
            }else if(nums[i] + nums[left] + nums[right] > 0) {
                right-=1;
            }else{
                left+=1;
            }
        }
    }
    
    return result;
};


/**
 * @ leetcode 矩阵置零
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    if(matrix.length===0) return matrix; 
    let n =  matrix.length;
    let m =  matrix[0].length;
    let zeros = Array(m+n).fill(false);
    
    for(let i=0;i<n;i+=1) {
        for(let j=0;j<m;j+=1) {
            if(matrix[i][j]===0) {
                zeros[i] = true;
                zeros[n+j]  = true;
            }
        }
    }
    
    for(let i=0;i<n;i+=1) {
        if(zeros[i]) {
            matrix[i] = Array(m).fill(0);
        }
    }
    
    for(let i=0;i<m;i+=1) {
        if(zeros[n+i]) {
            for(let j=0;j<n;j+=1) {
                matrix[j][i] = 0;
            }
        }
    }
    
};