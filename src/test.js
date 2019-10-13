/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-28 12:33:14
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if(!matrix[0]) return false;
    
    const rows = matrix.length; //1
    const cols = matrix[0].length //2
    let j = cols-1, 
        i = 0;
    while( j >= 0 &&  i < rows) {
        if(matrix[i][j] === target) {
            return true;
        }else if(matrix[i][j] > target) {
            j-=1;
        }else{
            i+=1; 
        }
    }
    return false;
};