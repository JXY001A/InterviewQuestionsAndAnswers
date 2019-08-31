/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-31 18:18:32
 */

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    if(s.length===0) return -1;
    let tempMap = {};
    let chars = s.split('');
    chars.forEach((chart,index)=>{
        if(tempMap[chart] === void 0) {
            tempMap[chart] = {
                count : 1,
                indexs:[index],
            };
        }else{
            tempMap[chart].count+=1;
            tempMap[chart].indexs.push(index);
        }
    });

    const onlyIndexs = [];
    Object.values(tempMap).forEach((item,index)=>{
        if(item.count === 1) {
            onlyIndexs.push(item.indexs[0]);
        }
    });
    const result = onlyIndexs.sort((a,b)=>a-b)[0];
    return typeof result === 'number'? result : -1;
    
};

var firstUniqChar = function(s) {
    for(let i = 0; i < s.length; i++) {
        if(s.indexOf(s[i]) === i && s.lastIndexOf(s[i]) === i) {
            return i;
        }
    }
    return -1;
};