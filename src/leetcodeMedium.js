/*
 * @description: 
 * @author: JXY
 * @Date: 2019-09-18 22:15:38
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-09-28 16:26:41
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


/**
 * @name  leetcode 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring1 = function(s) {
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
        tempMap[c] = true;
    }
    return res;
};

/**
 * @name  leetcode 无重复字符的最长子串，优化
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring2 = function(s) {
    const len = s.length;
    if(len == 0 ) return 0;

    let max_len = 0;
    let str = '';

    for(let i=0;i<len;i+=1) {
        const delIndex = str.indexOf(s[i]);
        if(delIndex !== -1) {
            str = str.slice(delIndex+1)+s[i];
        }else{
            str+=s[i];
        }
        max_len  = Math.max(max_len,str.length);
    }
    
    return   max_len;
};

/**
 * @name  leetcode 最长回文子串
 * @param {string} s
 * @return {string}
 * @关键 if(s[i] === s[j] && dp[i+1][j-1]) { 此时的 s.slice(i,j+1) 为回文字符串}
 */
var longestPalindrome = function(s) {
    const len = s.length;
    if(len<=1) return s;
    const dp = [];
    let res = '';
    for(let i=len-1;i>=0;i-=1) {
        dp[i] = [];
        for(let j=i;j<len;j+=1) {
            if(i === j) {
                dp[i][j] = true;
            }else if(j-i == 1 && s[i] === s[j]){
                dp[i][j] = true;
            }else if(s[i] === s[j] && dp[i+1][j-1]) {
                dp[i][j] = true;
            }
            
            if(dp[i][j] && j-i+1 > res.length) 
                res = s.slice(i,j+1);
        }
    }
    return res;
};


/**
 * @name  leetcode 递增的三元子序列
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
    const len = nums.length;
    if(len < 3) return false;
    
    let one = Number.MAX_VALUE;
    let two = Number.MAX_VALUE;
    
    for(i=0;i<len;i+=1) {
        if(nums[i] <= one) {
            one = nums[i];
        }else if(nums[i] <= two) {
            two = nums[i];
        }else{
            return true;
        }
    }
    
    return false;
    
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @name  leetcode 两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
    function ListNode(val) {
      this.val = val;
      this.next = null;
    }
    
    if(!l1 || !l2) return null;
    
    let head = node = new ListNode(null);
    let carried = 0;
    
    while(l1 || l2) {
        let l1Val = l1?l1.val:0;
        let l2Val = l2?l2.val:0;
        const sum = l1Val + l2Val + carried;
        if(sum>=10) {
            node.next = new ListNode(sum-10);
            node = node.next;
            carried = 1;
        }else{
            node.next = new ListNode(sum);
            node = node.next;
            carried = 0;
        }
        
        if(l1) l1 = l1.next;
        
        if(l2) l2 = l2.next;
        
        if(carried) node.next = new ListNode(carried);
    }
    return head.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * c
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    if(head===null || head.next === null) return head;
    let oddV = {next:head};
    let evenV = {next:head.next}
    let odd = oddV.next;
    let even = evenV.next;
    
    while(odd && even && odd.next && even.next) {
        let nextOdd = odd.next.next;
        let nextEven = even.next.next;
        
        odd.next = nextOdd;
        even.next = nextEven;
        
        odd = odd.next;
        even =even.next;
    }
    odd.next = evenV.next;
    return oddV.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @ leetcode 相交链表
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if(headA == null || headB == null) return null;
    
    function getLength (node) {
        let len = 0;
        while(node) {
            node = node.next;
            len+=1;
        }
        return len; 
    } 
    
    let a = headA;
    let b = headB;
    
    let lena = getLength(a);
    let lenb = getLength(b);
    
    
    if(lena>lenb) {
        let more = lena - lenb;
        while(more>0) {
            headA = headA.next;
            more-=1;
        }
    }else {
        let more = lenb - lena;
        while(more>0) {
            headB = headB.next;
            more-=1
        }
    } 
    
    while(headA && headB) {
        if(headA === headB) {
            return headA; 
        }
        headA = headA.next;
        headB = headB.next;
    }
    return null;  
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @ leetcode 中序遍历，迭代实现
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    if(root===null) return [];
    
    const stacks = [];
    const result = [];
    
    while(root) {
        stacks.push(root);
        root = root.left; 
    }
    
    while(stacks.length > 0) {
        const node = stacks.pop();
        result.push(node.val);
        
        let right = node.right;
        while(right) {
            stacks.push(right);
            right = right.left;
        }
    }
    return result;
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @ leetcode 二叉树的锯齿形层次遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(!root) return [];
    
    const NORMAL  = '1';
    const REVERSE = '0';
    
    let status = NORMAL;
    
    const stacks = [root];
    const result = [];
    
    while(stacks.length>0) {
        let levelCount = stacks.length;
        let levelList = [];
        
        while(levelCount>0) {
            let node = stacks.shift();
            
            if(node.left) {
               stacks.push(node.left);
            }
            
            if(node.right) {
               stacks.push(node.right);
            }
            
            levelList.push(node.val);
            levelCount-=1;
        }
        
        if(status === NORMAL) {
            result.push(levelList);
            status = REVERSE;
        }else{
            result.push(levelList.reverse());
            status = NORMAL;
        }
    }
    return result;
};