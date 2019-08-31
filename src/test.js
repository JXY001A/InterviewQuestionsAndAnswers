/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-30 15:33:05
 */


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
test = [[1,2,3],[4,5,6],[7,8,9]];
var rotate = function(matrix) {
    const len1 = matrix.length;
    const len2 = matrix[0].length;
    
   for(let k=0;k<len1;k+=1) {
        matrix.push([]);
   }
    
    let newIndex = len1;
    for(let i=0;i<len2;i+=1) {
        for(let j=len1-1;j>=0;j-=1) {
            matrix[newIndex].push(matrix[j][i]);
        }
        newIndex+=1;
    }
    matrix.splice(0,len1);
};
rotate(test);