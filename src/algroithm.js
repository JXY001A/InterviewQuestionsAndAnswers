/*
 * @description: 输入一个int类型的，返回整数逆序后的字符串，例如：1234 -> '4321' 。要求递归，不能使用全局变量。输入函数只能掺入一个参数  
 * @Date: 2019-07-09 09:24:50
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

    function _recursion(reverseStr, numsArr, index) {
        if (index < 0) return reverseStr;
        return _recursion(reverseStr + numsArr[index], --index);
    }

    const numsArr = Array.from(num + '');
    return _recursion('', numsArr, numsArr.length - 1);
}

/**
 * @description: 给定一个整数和一个目标值，找出和为两个目标值的两个数：nums:[2,7,11,15] target: 9 , resutl:[0,1]
 * @Date: 2019-07-09 09:42:18
 */
function getIndexsArr(nums, target) {
    if (!Array.isArray(nums) || typeof target !== 'number') return [];
    let templete = {};
    let result = [];
    for (let i = 0, len = nums.length; i < len; i += 1) {
        if (templete[target - nums[i]] !== undefined) {
            result.push(templete[target - nums[i]]);
            result.push(i);
        } else {
            // 注意：是数值相加 ，不要写成了 templete[traget-nums[i]] = i; 这样就反了，永远不会相等了。
            templete[nums[i]] = i;
        }
    }
    return result;
}

/**
 * @description 删除链表中的重复值
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    if (!head) return head;

    let newList = head;
    let current = head.next;
    while (current !== null) {
        if (newList.val !== current.val) {
            newList.next = current;
            newList = newList.next;
        }
        current = current.next;
    }

    newList.next = null;

    return head;
};


/* 
url有三种情况
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33

匹配elective后的数字输出（写出你认为的最优解法）:

[] || ['800'] || ['800','700'] 
*/

function getQueryApi(urls) {
    function _getRegexByName(name) {
        return new RegExp('[?&]' + name + '=([^?&#]*|&|$)')
    }

    function _getQueryByName(name) {
        return urls.map((url) => {
            let matchResult = _getRegexByName(name).exec(url);
            return matchResult[1] !== void 0 ? matchResult[1].split(',') : '';
        });
    }
    return _getQueryByName;
}

/* 
    修改以下 print 函数，使之输出 0 到 99，或者 99 到 0
    1、只能修改 setTimeout 到 Math.floor(Math.random() * 1000 的代码
    2、不能修改 Math.floor(Math.random() * 1000
    3、不能使用全局变量

    function print(n){
        setTimeout(() => {
            console.log(n);
        }, Math.floor(Math.random() * 1000));
    }
    for(var i = 0; i < 100; i++){
        print(i);
    }
*/

/*
    解决方案 1： 将setTimeout方法修改为一个IFFE，并返回返回一个 emptyFunction
    解决方案 2： setTimeout 并非直接受两个参数，后面也可以传递进入回调的参数，所以中间增加一个参数可以实际上替换，随机时间
    总结：此题目还有另外一个方向就是出入的n,相当于隐式的左连接查询赋值操作，print 函数作用于内保存了新的变量n  
*/
/**
 * @description:方案一 
 * @Date: 2019-07-20 15:29:59
 */
function print(n) {
    setTimeout((() => {
        console.log(n);
        return () => void 0;
    })(), Math.floor(Math.random() * 1000));
}
/**
 * @description:方案二 
 * @Date: 2019-07-20 15:29:59
 */
function print(n) {
    setTimeout(() => {
        console.log(n);
    }, n, Math.floor(Math.random() * 1000));
}


/**
 * @description:快速排序算法 
 * @param {array} 
 * @Date: 2019-07-23 23:50:24
 */
function quickSort(arr) {
    function _sort(arr, left, right) {
        if (left > right)
            return;
        let i, j, temp;
        i = left, j = right, temp = arr[left];
        while (i != j) {
            while (temp <= arr[j] && j > i) {
                j -= 1;
            }
            while (temp >= arr[i] && j > i) {
                i += 1;
            }

            if (j > i) {
                let t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }

        arr[left] = arr[i];
        arr[i] = temp;

        _sort(arr, left, i - 1);
        _sort(arr, i + 1, right);
    }

    _sort(arr, 0, arr.length - 1);
}


/**
 * @description: 冒泡排序算法 
 * @param {Array} 
 * @Date: 2019-07-28 11:35:05
 */

function BubblingSort(nums) {
    if (!Array.isArray(nums)) return;
    for (let i = 0, len = nums.length; i < len; i += 1) {
        for (let j = 0, len = nums.length; j < len - i - 1; j += 1) {
            if (nums[j] > nums[j + 1]) {
                let temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
            }
        }
    }
}

/**
 * @description: 插入排序 
 * @param {Array} 
 * @Date: 2019-07-28 11:57:17
 */
function insertSort(nums) {
    if (!Array.isArray(nums)) return;
    for (let i = 1, len = nums.length; i < len; i += 1) {
        for (let j = i; j > 0 && nums[j] < nums[j - 1]; j -= 1) {
            temp = nums[j];
            nums[j] = nums[j - 1];
            nums[j - 1] = temp;
        }
    }
}

/**
 * @description: 插入排序优化 
 * @param {Array} 
 * @Date: 2019-07-28 11:57:17
 */
function insertSortOptimization(nums) {
    if (!Array.isArray(nums)) return;
    for (let i = 1, len = nums.length; i < len; i += 1) {
        let temp = nums[i];
        let tIndex = i;
        for (let j = i - 1; j >= 0 && temp < nums[j]; j -= 1) {
            nums[tIndex] = nums[j];
            tIndex = j;
        }
        nums[tIndex] = temp;
    }
}

/**
 * @description: 选择排序算法
 * @param {Array} 
 * @Date: 2019-07-28 13:35:31
 */

function selectSort(nums) {
    if (!Array.isArray(nums)) return;
    for (let i = 0, len = nums.length; i < len; i += 1) {
        let minIndex = i;
        for (let j = i + 1, len = nums.length; j < len; j += 1) {
            if (nums[minIndex] > nums[j])
                minIndex = j;
        }

        let temp = nums[minIndex];
        nums[minIndex] = nums[i];
        nums[i] = temp;
    }
}

/**
 * @description: 归并排序算法
 * @param {Array} 
 * @Date: 2019-07-29 14:56:49
 */

function mergeSort(nums) {
    function _merge(arr, l, mid, r) {
        let tempArr = arr.slice(l, r + 1);

        let i = l,
            j = mid + 1;
        for (let t = l; t <= r; t += 1) {
            if (i > mid) {
                arr[t] = tempArr[j - l];
                j += 1;
            } else if (j > r) {
                arr[t] = tempArr[i - l];
                i += 1;
            } else if (arr[i] > arr[j]) {
                arr[t] = tempArr[j - l];
                j += 1;
            } else {
                arr[t] = tempArr[i - l];
                i += 1;
            }
        }
    }

    function _mergeSort(arr, l, r) {
        if (l >= r) return;
        const mid = Math.floor((l + r) / 2);
        _mergeSort(nums, l, mid);
        _mergeSort(nums, mid + 1, r);
        _merge(nums, l, mid, r);
    }

    if (!Array.isArray(nums)) return void 0;
    _mergeSort(nums, 0, nums.length - 1);
}


/**
 * @name 字符串大写转小写
 * @param {string} str
 * @return {string}
*/
var toLowerCase = function(str) {
    if(typeof str !== 'string' || str.length === 0) return str;
    
    var map = {};
    // A~Z:65-90
    // a~z:97-112
    for(var i=65;i<=90;i+=1) {
        map[String.fromCharCode(i)] = String.fromCharCode(i+32);
    }
    
    return str
        .split('')
        .map((key)=>{
            return map[key] ? map[key] : key;
        })
        .join('');
};

/**
 * @name 数组去重算法
 * @param {number[]} nums
 * @return {number}
 * const nums = [0,0,1,1,1,2,2,3,3,4];
 *   const result = [0, 1, 2, 3, 4];
 */

var removeDuplicates = function(nums) {
    if(!Array.isArray(nums) || !nums.length) return ;

    for(let i=1;i<nums.length;i+=1) {
        if(nums[i] === nums[i-1]) {
            nums.splice(i,1);
            i = i-1;
        }
    }
    return nums.length;
};

 /**
 * @name leetcode 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    if(!Array.isArray(prices) || !prices.length) return maxProfit;
    for(let i=0;i<prices.length-1;i+=1) {
        if(prices[i]<prices[i+1]) {
            maxProfit += prices[i+1] - prices[i];
        }
    }

    return maxProfit;
};

/**
 * @name leetcode 旋转数组
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    if(!Array.isArray(nums) || !nums.length ||  typeof k !== 'number' || k<=0) return;
    for(let i=0;i<k;i+=1) {
        let temp = nums.splice(nums.length-1,1);
        nums.unshift(temp[0])
    }
};

/**
 * @name leetcode 存在重复
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    if(!Array.isArray(nums)) return false;
    const tempMap = {};
    nums.forEach(key=>tempMap[key] = null);
    return Object.keys(tempMap).length === nums.length;
};

/**
 * @name leetcode 两个数组的交集 II
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let commons = [];
    // 务必将 nums1, nums2 对应分配给 maxLengthNums,minLengthNums. 些 >= 目的是排除length 相等的时候 maxLengthNums ,minLengthNums 指向同一个数组的情况
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
}

/**
 * @name leetcode 加一
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    if(!digits.length) return digits;
    
    let isTen = false;
    digits[digits.length-1] += 1;

    for(let i=digits.length-1;i>=0;i-=1) {
        if(digits[i] === 10) {
            isTen = true;
            digits[i] = 0;
            if(digits[i-1]) digits[i-1] +=1;
        }else{
            isTen = false;
            break;
        }
    } 
    if(isTen) {
        digits.unshift(1);
    }
    return digits;
};

/**
 *  @name leetcode 移动零
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 解法一
var moveZeroes1 = function(nums) {
    let len = nums.length;
    for(let i=0;i<len;i+=1) {
        if(nums[i] === 0) {
            for(let j=i+1;j<len;j+=1) {
                nums[j-1] = nums[j];
            }
            // 将索引拉回到新替换上来的数字位置，否则会遗漏
            i-=1;
            nums[--len] = 0;
        }
    }
};
// 解法二 ，效率更高
var moveZeroes2 = function(nums) {
    let zerocount = 0;
    for(let i=0;i<nums.length;i+=1) {
        if(nums[i] === 0) {
            nums.splice(i,1);
            // 将索引拉回到新替换上来的数字位置，否则会遗漏
            i-=1;
            zerocount+=1;
        }
    }
    if(zerocount) {
        nums.push(...Array(zerocount).fill(0)) 
    }
};

/**
 * @name leetcode 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let tempMap = {};
    for(let i=0,len=nums.length;i<len;i+=1) {
        if(tempMap[target - nums[i]] !== void 0) {
            return [tempMap[target - nums[i]],i];
        }else{
            tempMap[nums[i]] = i;
        }
    }
};


/**
 * @name leetcode 有效的数独
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let tempMap = {};
    const len = board.length;
    for(let i=2;i<len;i+=3) {
        for(let j=2;j<len;j+=3) {
            for(let t=i;t>i-3;t-=1) {
                for(let d = j; d>j-3;d-=1) {
                     
                    if(board[t][d] === '.') continue;

                    if(tempMap[board[t][d]] === void 0) {
                        tempMap[board[t][d]] = null;
                    }else{
                        return false;
                    }
                }
            }
            tempMap = {};
        }
    }

    tempMap = {};
    for(let i=0;i<len;i+=1) {
        for(let j=0;j<len;j+=1) {
            if(board[i][j] === '.') continue;  

            if(tempMap[board[i][j]] === void 0 ) {
                tempMap[board[i][j]] = null;
            }else{
                return false;
            }
        }
        tempMap={};
    }

    tempMap = {};

    for(let i=0;i<len;i+=1) {
        for(let j=0;j<len;j+=1) {
            if(board[j][i] === '.') continue;  

            if(tempMap[board[j][i]] === void 0 ) {
                tempMap[board[j][i]] = null;
            }else{
                return false;
            }
        }
        tempMap={};
    }

    return true;
};
/**
 * @name leetcode  旋转图像
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

/**
 * @name leecode 反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    const len = s.length;
    for(let i=len-1;i>=0;i-=1) {
        s.push(s[i]);
    }
    s.splice(0,len);
};

/**
 * @name leecode 整数反转
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const min = -Math.pow(2,31);
    const max = Math.pow(2,31)  - 1; 
    const symbol = x>=0?1:-1;
    x = (symbol * x) + '';

    if(x.length<=1) return x;
    
    let nums = x.split('').reverse(); 
    let zeroIndex = -1;
    for(let i=0,len=nums.length;i<len && nums[i] == 0;i+=1) {
        zeroIndex+=1;
    }
    const result  = parseInt(nums.slice(zeroIndex+1,nums.length).join(''),10) * symbol;
    return (result>max || result < min)?0:result;
};

/**
 * @name leecode 字符串中的第一个唯一字符
 * @param {string} s
 * @return {number}
 */
// 算法一
var firstUniqChar1 = function(s) {
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
// 算法二（优秀）
var firstUniqChar2 = function(s) {
    for(let i = 0; i < s.length; i++) {
        if(s.indexOf(s[i]) === i && s.lastIndexOf(s[i]) === i) {
            return i;
        }
    }
    return -1;
};

/**
 * @name leecode 有效的字母异位词
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    const sTempMap = {};
    const tTempMap = {};
    const len = s.length;

    for(let i=0;i<len;i+=1) {
        if(sTempMap[s[i]]) {
            sTempMap[s[i]]+=1;
        }else{
            sTempMap[s[i]]=1;
        }

        if(tTempMap[t[i]]) {
            tTempMap[t[i]]+=1;
        }else{
            tTempMap[t[i]]=1;
        }
    }

    for(const key in sTempMap) {
        if(tTempMap[key] !== sTempMap[key]) {
            return false;
        }
    }
    
    return true;
};

/**
 * @name leecode 验证回文串
 * @param {string} s
 * @return {boolean}
 */
// 算法一
var isPalindrome1 = function(s) {
    let strArr = s.match(/[0-9a-zA-Z]+/g);
    if(!strArr) {
      return true;  
    }
    const chars = strArr.join('').toLowerCase().split('');

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

// 算法二（更快）
var isPalindrome2 = function(s) {
    s = s.replace(/[^a-zA-Z0-9]/g,"").replace(/\s/g,"").toLowerCase();
    let i =0,j = s.length-1;
    while(j>i) {
        if(s[j]!=s[i]) return false;
        i++;
        j--;
    }
    return true;
};


/**
 * @name leecode 字符串转换整数 (atoi)
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    const min = -Math.pow(2,31);
    const max = Math.pow(2,31)  - 1;
    str = str.trim();

    let numsArr = str.match(/^[-+]?\d+/g);
    if(!numsArr) return 0;
    const result = parseInt(numsArr[0],10);
    
    if(result>max) return  max;
    if(result<min) return  min;

    return result;
};

/**
 * @name leecode 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(!strs.length) return '';
    strs = strs.sort((stra,strb)=>{return stra.length-strb.length});
    const minStr =  strs[0];
    if(minStr==='') return '';
    
    let prefix = '';
    for(let i=0,len=minStr.length;i<len;i+=1) {
        var tempPrefix = minStr[i];
        const isPrefix = strs.every((item)=>item[i]===tempPrefix);
        if(!isPrefix) return  prefix;
        prefix+=tempPrefix;
    }
    return prefix;
};


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @name leecode 删除链表中的节点
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    if(node.next) {
        node.val =  node.next.val;
        node.next =  node.next.next;
    }
};


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @name leecode 删除链表的倒数第N个节点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let tempNode =   head;
    let linkedLength = 1;
    const linkedArr = [];
    linkedArr[linkedLength] = tempNode;

    while(tempNode.next) {
        tempNode = tempNode.next;
        linkedLength+=1;
        linkedArr[linkedLength] = tempNode;
    }
    // 给定一个链表: 1->2->3->4->5, 和 n = 2. 5-2+1 = 4
    const positionIndex = linkedLength-n+1;
    tempNode = linkedArr[positionIndex];

    if(positionIndex === linkedLength && linkedLength ===1) {
        return null;
    }

    if(!tempNode.next) {
        // 当被删除节点指向最后一个节点时，他的父节next 设置为 null 即可删除
        linkedArr[positionIndex-1].next = null;
    }else{

        tempNode.val =  tempNode.next.val ;
        tempNode.next = tempNode.next.next;
    }
    
    return head; 
}



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @name leecode 反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */

var reverseList1 = function(head) {
   if(!head || !head.next) return head; 
   let tempNode = head;
   let nodeList = [];
   while(tempNode) {
        nodeList.push(tempNode);
        tempNode = tempNode.next;
   }

   for(let i=nodeList.length-1;i>0;i-=1) {
       nodeList[i].next = nodeList[i-1]; 
   }
   head.next = null;
   return nodeList[nodeList.length-1];
};

var reverseList2 = function(head) {
    var prev = null;
    var curr = head;
    var newNode = head;
    while(curr) {
        newNode =  curr.next;
        curr.next = prev;
        prev = curr;
        curr = newNode;
    }
    return prev;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @name leecode 合并两个有序链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) return l2;
    if(l2 === null) return l1;
    
    let newHead =  head = null;
    
    if(l1.val<l2.val) {
        newHead = l1;
        head = l1;
        l1 = l1.next;
    }else{
        newHead = l2;
        head = l2;
        l2 = l2.next;
    }
    
    while(l1 && l2) {
        if(l1.val<l2.val) {
            newHead.next = l1;
            newHead = l1;
            l1 = l1.next;
        }else{
            newHead.next = l2;
            newHead = l2;
            l2 = l2.next;
        }      
    }
    
    if(l1 === null) newHead.next = l2;
    if(l2 === null) newHead.next = l1;
    return head;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @name leecode 验证回文链表算法
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if(head === null || head.next === null) return true;
    var nodeList = [];
    
    while(head) {
        nodeList.push(head);
        head = head.next;
    }
    
    var len = nodeList.length;
    var halfLen = parseInt(len/2,10);
    for(var i=0;i<halfLen;i+=1)  {
          if(nodeList[i].val !== nodeList[len-i-1].val) return false;   
    }
    return true; 
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @name leecode 验证环形链表
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(head === null || head.next === null) return false;
    
    var index = 0;
    while(head.next) {
        if(head.index !== void 0) {
            return true;
        }else{
            head.index = index;
        }
        
        head = head.next;
        index+=1;
    }
    
    return false; 
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @name leecode 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth1 = function(root) {
    var _depth = (root)=>{
    if(root === null) return 0;
        let i = _depth(root.left);
        let j = _depth(root.right);

        return Math.max(i,j) + 1;
    }
    return _depth(root);
};


var maxDepth2 = function(root) {
    if(root === null) return 0;
    return 1 + Math.max(maxDepth(root.left) , maxDepth(root.right));
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @name leecode 验证二叉搜索树
 * @param {TreeNode} root
 * @return {boolean}
 * 
 *            6       
 *        /      \
 *      4         9
 *   /   \      /  \
 *  1     5    7    10
 * 
 * 中序遍历后的 valList ===  [1,4,5,6,7,9,10];
 */
var isValidBST = function(root) {
    
    var valList = [];
    function _isValidBST(root) {
        // 中序遍历
        if(root === null) return;
        _isValidBST(root.left);
        valList.push(root.val);
        _isValidBST(root.right);
    }
    
    _isValidBST(root);
    for(let i=0,len=valList.length;i<len-1;i+=1) {
        if(valList[i] >= valList[i+1]) return false;
    }
    
    return true;  
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @name leecode 验证对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
// 递归实现
var isSymmetric1 = function(root) {

    function _isSymmetric(root1,root2) {
        if(root1 === null && root2 === null ) return true;
        if(root1 === null && root2 !== null ) return false;
        if(root1 !== null && root2 === null ) return false;
        if(root1.val !== root2.val) return false;
        return _isSymmetric(root1.left,root2.right) && _isSymmetric(root1.right,root2.left);
    } 
    
    if(root === null) return true;
    return _isSymmetric(root.left,root.right);
};

// 层级遍历实现
var isSymmetric2 = function(root) {
    if(root === null) return true;
    let nodeList = [root.left,root.right];
    while(nodeList.length !==0 ) {
        let leftRoot = nodeList.shift();
        let rightRoot = nodeList.shift();
       
        if(leftRoot === null && rightRoot !== null) return false;
        
        if(leftRoot !== null && rightRoot === null) return false;
        
        if(leftRoot && rightRoot) {
            if(leftRoot.val !== rightRoot.val)  return false;
           
            nodeList.push(leftRoot.left);
            nodeList.push(rightRoot.right);

            nodeList.push(leftRoot.right);
            nodeList.push(rightRoot.left);
        }
    } 
    return true;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @name leecode 二叉树的层次遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const listLevel = [];
    if(root===null) return listLevel;
    
    const nodeList = [root];
    while(nodeList.length !== 0) {
        let len = nodeList.length-1;
        let tempList = [];
        while(len>=0) {
            let tempNode = nodeList.shift();
            if(tempNode.left)  nodeList.push(tempNode.left);
            if(tempNode.right) nodeList.push(tempNode.right);
            tempList.push(tempNode.val);
            len-=1;
        }
        listLevel.push(tempList);
    }
    return listLevel;
};

/**
 * @name leecode 将有序数组转换为二叉搜索树
 * @desc 二叉搜索树： 指的是任何一个节点的左子树的值都小于该节点，右子树都大于该节点
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
    }
    
    function _sortedArrayToBST(nums,l,r) {
        if(l>r) return null;
        const mid = parseInt((l+r)/2);
        const curr = new TreeNode(nums[mid]);
        curr.left = _sortedArrayToBST(nums,l,mid-1);
        curr.right = _sortedArrayToBST(nums,mid+1,r);

        return curr;
    }
    
    if(nums === null || nums.length === 0) return null;
    
    return _sortedArrayToBST(nums,0,nums.length-1);
    
};

/**
 * @name leecode 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    const temp = nums1.slice(0,m);
    let i=j=0;
    const maxLength = m + n;
    for(let k=0;k<maxLength;k+=1) {
        if(temp[i] >= nums2[j] && j < n) {
            nums1[k] = nums2[j];
            j+=1;
        }else if(temp[i] <= nums2[j] && i < m){
            nums1[k] = temp[i];
            i+=1;            
        }else if(j>n-1) {
            nums1[k] = temp[i];
            i+=1
        }else{
            nums1[k] = nums2[j];
            j+=1
        }
    }
};

/**
 * @name leecode 一个错误的版本
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        if(n<=1) return n;
        let l = 1,r=n;
        let mid;
        while(l<r) {  
            mid = parseInt((l+r)/2);
            if(isBadVersion(mid)) {
                r = mid;
            }else{
                l = mid+1;
            }
        }
        return r;
    };
};