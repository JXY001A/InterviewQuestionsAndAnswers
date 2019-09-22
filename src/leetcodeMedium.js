/*
 * @description: 
 * @author: JXY
 * @Date: 2019-09-18 22:15:38
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-09-22 22:50:30
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

/**
 * leetcode 字谜分组
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const result = [];
    if(strs.length===0) return result;
    
    strs = strs.map((str)=>{
        const key = str.split('').sort((a,b)=>a.charCodeAt(0) - b.charCodeAt(0)).join('');
        return {[key]:str};
    });
    
    const tempMap = {};
    
    
    strs.forEach((strObj)=>{
        for(let key in strObj) {
            const str = strObj[key];
            if(tempMap[key] === undefined) {
                tempMap[key] = result.length;
                result[tempMap[key]] = [str]
            }else{
                result[tempMap[key]].push(str);
            }
        } 
        
    });
    
    return result;
    
};


/**
 * @name leetcode 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if(!s) return 0;
    
    let tempMap = {};
    let res = 0;
    let slieWindow = [];
    
    for(let c of s) {
        if(tempMap[c]) {
            let delIndex = slieWindow.findIndex(_c => _c === c);
            for(let i=0;i<=delIndex;i+=1) {
                tempMap[slieWindow[i]] = false;
            }
            slieWindow = slieWindow.slice(delIndex+1).concat(c);
        }else{
            if(slieWindow.push(c) > res) {
                res = slieWindow.length;
            }
        }
        // 考虑 'ddddd' 情况 
        tempMap[c] = true;
    }
    return res;
};