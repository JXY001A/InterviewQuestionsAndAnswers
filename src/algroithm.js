/*
 * @description: 输入一个int类型的，返回整数逆序后的字符串，例如：1234 -> '4321' 。要求递归，不能使用全局变量。输入函数只能掺入一个参数  
 * @author: JXY
 * @Date: 2019-07-09 09:24:50
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-07-09 10:15:53
 */
// 解答方案一
function getNumberReverseStr1(num) {
    if (typeof num !== 'number') return '';
    const numsArr = Array.from(num + '');
    return _recursion('', numsArr.length - 1);

    function _recursion(reverseStr, index) {
        if (index < 0) return reverseStr;
        return _recursion(reverseStr + numsArr[index], --index);
    }
}
// 解答方案二 （将arrNums 传递，意味着_recursion 方法可以分离）
function getNumberReverseStr2(num) {
    if (typeof num !== 'number') return '';
    
    function _recursion(reverseStr,numsArr,index) {
        if (index < 0) return reverseStr;
        return _recursion(reverseStr + numsArr[index], --index);
    }

    const numsArr = Array.from(num + '');
    return _recursion('', numsArr ,numsArr.length - 1);
}

/**
 * @description: 给定一个整数和一个目标值，找出和为两个目标值的两个数：nums:[2,7,11,15] target: 9 , resutl:[0,1]
 * @author: JXY
 * @param {type} 
 * @return: 
 * @Date: 2019-07-09 09:42:18
 */
function getIndexsArr(nums,target) {
    if(!Array.isArray(nums) || typeof target !== 'number') return [];
    let templete =  {};
    let result = [];
    for(let i=0,len=nums.length;i<len;i+=1) {
        if(templete[target-nums[i]] !== undefined) {
            result.push(templete[target-nums[i]]);
            result.push(i);
        }else{
            // 注意：是数值相加 ，不要写成了 templete[traget-nums[i]] = i; 这样就反了，永远不会相等了。
            templete[nums[i]] = i;
        }
    }
    return result;
}
