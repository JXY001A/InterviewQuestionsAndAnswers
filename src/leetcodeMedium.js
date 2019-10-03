/*
 * @description: 
 * @author: JXY
 * @Date: 2019-09-18 22:15:38
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-10-03 15:16:24
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

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @name leetcode 从前序与中序遍历序列构造二叉树
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(preorder.length == 0) return  null;
    return getTree(preorder, inorder);
};
    
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function getTree(preorder,inorder) {
    if(inorder.length == 0) return null;
    const rootVal = preorder.shift();
    
    const root = new TreeNode(rootVal);
    const rootIndex = inorder.indexOf(rootVal);
    
    root.left = getTree(preorder,inorder.slice(0,rootIndex));
    root.right = getTree(preorder,inorder.slice(rootIndex+1));
    
    return  root;
}


/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @name leetcode 从前序与中序遍历序列构造二叉树
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if(!root) return null;
    
    if(root.left!=null){
        root.left.next=root.right;
        if(root.next!=null)
            root.right.next=root.next.left;
    }

    connect(root.left);
    connect(root.right);
    
    return root;
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @name leetcode 二叉搜索树中第K小的元素（递归方式）
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    if(!root || k == 0) return;
    
    function iteatorTree(node,list) {
        if(node === null) return;
        iteatorTree(node.left,list);
        list.push(node.val);
        iteatorTree(node.right,list);
    }
    
    const list = [];
    iteatorTree(root,list);
    return list[k-1];
};
/**
 * @name leetcode 二叉搜索树中第K小的元素 （迭代方式）
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    if(!root || k == 0) return;
    let stacks = [];
    let count = 0;
    
    while(root) {
        stacks.push(root);
        root = root.left;
    }
    
    while(stacks.length>0) { 
        count+=1;
        let node = stacks.pop();
        let right = node.right;
        if(right) {
            stacks.push(right);
            while(right.left) {
                stacks.push(right.left);
                right = right.left;
            }
        }
        
        if(count === k) {
            return node.val;
        }
    }
    
};

/**
 * @name leetcode 岛屿数量
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if(grid === null || grid.length === 0) return 0;
    const book = {};
    const next = [[0,1],[1,0],[0,-1],[-1,0]];
    
    const col = grid.length -1;
    const row = grid[0].length -1;
    
    let count = 0;
    
    for(let i=0;i<=col;i+=1) {
        for(let j=0;j<=row;j+=1) {
            if(grid[i][j] == 1) {
                def(i,j);
                count += 1;
            }
        }
    }
    
    function def(x,y) {
        for(let i=0;i<4;i+=1) {
            let tx = x + next[i][0];
            let ty = y + next[i][1];
            
            if(tx < 0 || tx > col || ty < 0 || ty > row || grid[tx][ty] == 0)  
                continue;
            
            grid[tx][ty] = 0;
            def(tx,ty);
        }
    }

    return count;
};


/**
 * @name leetcode 全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    if(nums.length === 0) return [[]];
    const len = nums.length;
    const result = [];
    let tempSubRet = [];
    const book = [];
    
    function dfs(step) {
        if(len == step) {
            result.push(tempSubRet.map(num=>num));
            return;
        }
        
        for(let i=0;i<len;i+=1) {
            if(book[i] !== 1) {
                tempSubRet[step] = nums[i];
                book[i] = 1;
                dfs(step+1);
                book[i] = 0;
            }
        }
    }
    
    dfs(0);
    
    return result;
};


/**
 * @name leetcode 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    digits = digits.split('').filter(num=>num!==1);
    if(digits.length == 0) return [];
    
    let maps = {
        '2':['a','b','c'],
        '3':['d','e','f'],
        '4':['g','h','i'],
        '5':['j','k','l'],
        '6':['m','n','o'],
        '7':['p','q','r','s'],
        '8':['t','u','v'],
        '9':['w','x','y','z'],
    };
    
    function dfs(digits,result) {
        if(digits.length==0) return result;
        
        letter = digits.shift();
        if(result.length == 0) {
            result.push(...letter);
        }else{
            const tempResult = [];
            letter.forEach((char)=>{
                result.forEach((str)=>{
                    tempResult.push(str + char);
                });
            });
            result = tempResult;
        }
        
        return dfs(digits,result);        
    }
    
    
    digits = digits.map((num)=>maps[num]);
    
    return dfs(digits,[]);    
};

/**
 * @name leetcode 子集
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    function dfs(result,tempList,nums,start) {
        result.push([...tempList]);
        
        for(let i=start,len = nums.length;i<len;i+=1) {
            tempList.push(nums[i]);
            dfs(result,tempList,nums,i+1);
            tempList.pop();
        }
    }
    
    const result = [];
    dfs(result,[],nums,0);
    
    return result;
};


/**
 * @name leetcode 生成括号
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    function dfs(result,cur,n,left,right) {
        if(right === n) {
            result.push(cur);
            return;
        }
        
        if(left < n) {
            dfs(result,cur+"(", n ,left+1,right);
        }
        if(right < left) {
            dfs(result,cur+")", n ,left,right+1)
        }
    }
    
    const ret = [];
    dfs(ret,'',n,0,0);
    
    return  ret; 
};