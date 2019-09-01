/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-09-01 12:37:20
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var test = "A man, a plan, a canal: Panama";
var isPalindrome = function(s) {
    
    s = s.toLocaleLowerCase();
    const chars = s.split('').filter(char=>/[a-z]/.test(char));
    const len =  chars.length;
    
    if(len<=1) return true;
     
    const halfLen = Math.floor(len/2);
    let i = 0; 
    while(i<halfLen) {
        if(chars[i]!== chars[len-i-1]) return false;
        i+=1;
    } 
    return true;
};
isPalindrome(test);
