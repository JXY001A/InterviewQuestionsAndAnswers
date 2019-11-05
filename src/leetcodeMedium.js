/*
 * @description: 
 * @author: JXY
 * @Date: 2019-09-18 22:15:38
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-11-05 17:56:23
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
 * @name 奇偶链表
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
 * @@name leetcode 相交链表
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
 * @name leetcode 二叉树中序遍历，迭代实现
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
 * @@name leetcode 二叉树的锯齿形层次遍历
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
 * @name leetcode 填充每个节点的下一个右侧节点指针
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

/**
 * @name leetcode 单词搜索
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {  
    if(board.length == 0) return false;
    
    const rows =  board.length;
    const cols =  board[0].length;
    const next = [[0,1],[1,0],[0,-1],[-1,0]];
    
    function dfs(i,j,index,word,board) {
        if(word.length === index) return true;
        
        if(i<0 || j < 0 || i > rows-1 ||  j > cols-1 || board[i][j] != word.charAt(index)) return false;
        
        board[i][j] = null;
        
        for(let k = 0;k<next.length;k+=1) {
            if(dfs(i+next[k][0] ,j+next[k][1],index+1,word,board)) {
                return true;
            }
        }
        
        /*
            [
                ["C", "A", "A"],
                ["A", "A", "A"],
                ["B", "C", "D"]
            ]
            
            "AAB"  
        */
        // 目的是防止以上情况的产生，也就是说在一次循环遍历完成后别难过没有找到正确的结果时，还原原来的结果
        board[i][j] = word.charAt(index);
    }
    
    
    for(let i=0;i<rows;i+=1) {
        for(let j=0;j<cols;j+=1) {
            if(board[i][j] === word.charAt(0)) {
                if(dfs(i,j,0,word,board)) return true; 
            }
        }
    }
    
    return false;
};


/**
 * @name leetcode  颜色分类
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let records = [0,0,0];
    nums.forEach((n)=>{
        records[n] += 1;
    });
    
    for(let i=0,len=nums.length;i<len;i+=1) {
        if(records[0]) {
            nums[i] = 0;
            records[0]-=1;
        }else if(records[1]) {
            nums[i] = 1;
            records[1]-=1;
        }else{
            nums[i] = 2;
            records[2]-=1;
        }
    }
};

/**
 * @name leetcode  前 K 个高频元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    function swap(arr,i,j) {
        let temp = arr[i];
        arr[i] =  arr[j];
        arr[j] = temp;
    }
    
    if(nums.length<=1) return nums;
    
    const temp = {};
    let newK = k;
    
    nums.forEach((n)=>{
        if(temp[n] == undefined) {
            temp[n] = 1;
        }else{
            temp[n] += 1;
        }
    });
    
    const numsKey = Object.keys(temp);
    const records = Object.values(temp);
    
    // if(records.length <= 1) return numsKey;
    
    for(let i=0,len=records.length;i<len;i+=1) {
        if(k-i === 0) return numsKey.slice(numsKey.length-k);
        
        for(let j=0;j<len-i-1;j+=1) {
            if(records[j] > records[j+1]) {
                swap(records,j,j+1);
                swap(numsKey,j,j+1);
            }
        }
    }
    
    return numsKey.slice(numsKey.length-k); 
}

/**
 * @name leetcode  数组中的第K个最大元素 ,归并算法实现
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
    function mergeSort(nums,l,r) {
        if(l>=r) return ;
        
        const mid = Math.floor((l+r)/2);
        
        mergeSort(nums,l,mid);
        mergeSort(nums,mid+1,r);
        
        merge(nums,l,mid,r);
    }
    
    function merge(nums,l,mid,r) {
        const tempNums = nums.slice(l,r+1);
        let i = l,
            j = mid+1;
        
        for(let k=l;k<=r;k+=1) {
            if(i>mid) {
                nums[k] =  tempNums[j-l];
                j+=1;
            }else if(j>r) {
                nums[k] =  tempNums[i-l];
                i+=1;
            } else if(tempNums[j-l] < tempNums[i-l]) {
                nums[k] =  tempNums[i-l];
                i+=1;
            }else{
                nums[k] =  tempNums[j-l];
                j+=1;
            }
        }
    }
    mergeSort(nums,0,nums.length-1);
    
    return nums[k-1];
};


/**
 * @name leetcode  寻找峰值
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let l = 0,
        r = nums.length - 1;
    
    while(l<r) {
        const mid = Math.floor((l+r)/2);
        if(nums[mid+1] > nums[mid]) {
            l = mid+1
        }else{
            r = mid;
        }
    }
    
    return l;
    
};

/**
 * @anme leetcode 在排序数组中查找元素的第一个和最后一个位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    
    function indexOf(nums,target) {
        let l = 0,
            r = nums.length-1;
        while(l<r) {
            const mid = Math.floor((l+r)/2);
            
            if(nums[mid] >= target) {
                r = mid;
            }else{
                l = mid+1;
            }
            
        }
        return nums[l] === target ? l:-1;
    }
    
    
    function lastIndexOf(nums,target) {
        let l = 0,
            r = nums.length-1;
        
        while(l<r) {   
            // [5,7,7,8,8,10] , 8 例子中：l=4,r=5 的时候，  const mid = Math.floor((l + r)/2); 会永远等于 4，陷入无限循环中
            const mid = Math.floor((l + r + 1)/2);
            
            if(nums[mid] <= target) {
                l = mid;
            }else{
                r = mid-1;
            }
        }
        
        return nums[l] === target ? l : -1;
    }
    
    return [indexOf(nums,target),lastIndexOf(nums,target)]
};


/**
 * @anme leetcode 合并区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    
    function intersected(a,b) {
        // 1,6   8,10
        if(a[0]>b[1] || b[0] > a[1]) return false;
        return true;
    }
    
    function mergeTwo(a,b) {
        return [Math.min(a[0],b[0]),Math.max(a[1],b[1])];
    }
    
    const ret = [];
    intervals.sort((a, b) => a[0] - b[0]);
    
    for(let i=0;i<intervals.length;i+=1) {
        const pre = ret[ret.length-1];
        const curr = intervals[i].sort((a,b)=>a-b);
        
        if(pre === void 0) {
            ret.push(curr);
        }else{
            
            if(intersected(pre,curr)) {
                ret[ret.length-1] = mergeTwo(pre,curr);
            }else{
                ret.push(curr);
            }
             
        }
    }
    
    return ret;
};



/**
 * @anme leetcode 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let l = 0,
        r = nums.length - 1;
    
    while(l<=r) {
        const mid = Math.floor((l+r)/2);
        const temp = nums[l];
        
        if(nums[mid] === target ) return mid;
        
        if(nums[mid] === temp) {
           l = mid+1;
        }else if(temp > nums[mid]) {
            // [mid,r] 有序
            if(target<=nums[r] && target >= nums[mid]) {
                l = mid+1;
            }else{
                r = mid-1;
            }
        } else {
            // [l,mid] 有序
            if(target>=nums[l] && target<=nums[mid]) {
                r = mid-1;
            }else{
                l = mid+1;
            }
        }
        
        
    }
    return -1;
};


/**
 * @anme 搜索二维矩阵 II
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if(!matrix[0]) return false;
    
    const rows = matrix.length; 
    const cols = matrix[0].length;
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


/**
 * @anme 跳跃游戏
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    // 思路： 我们知道一点 (nums[i-1] + (i-1)) > i 的时候就说明 能到达 i 点位。那么接下来一次类推 ，循环完毕找到能走到的最远位置 max， max 大于 length-1 就说明能走到最后一个位置。 
    let max = 0;
    for(let i=0;i<nums.length;i+=1) {
        if(max<i) return false;
        max = Math.max(max,nums[i]+i);
    }
    
    return max >= (nums.length - 1);
};


/**
 *  @anme 不同路径
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const dp = [];
    for(let i=0;i<n;i+=1) {
        dp[i] = [1];
    }
    
    for(let i=0;i<m;i+=1) {
        dp[0][i] = 1;
    }
    
    for(let i=1;i<n;i+=1) {
        for(let j=1;j<m;j+=1) {
            // 到达 [i,j] 位置只可能来自于左侧和上面
            dp[i][j] = dp[i][j-1] + dp[i-1][j];
        }
    }
    return  dp[n-1][m-1];
};


/**
 * @name 零钱兑换
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    if(amount===0) return 0;
    
    const dp = Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    
    for(let i=1;i<=amount;i+=1) {
        for(let j=0;j<coins.length;j+=1){
            if(i - coins[j]>=0) {
                dp[i] = Math.min(dp[i],dp[i - coins[j]]+1);
            }
        }
    }
    return  dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};


/**
 * @name Longest Increasing Subsequence
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const len = nums.length;
    
    // 填充一的原因是 nums 中的单个元素都可以认为是一个上升子序列
    const dp = Array(len).fill(1);
    const LIS = nums.map(item=>[item]);
    
    for(let i=1;i<len;i+=1) {
        for(let j=0;j<i;j+=1) {
            if(nums[i] > nums [j]) {
                // 考虑：<1,2,3,4,0,5> ，理解 Math.max(dp[j] + 1,dp[i]) 
                dp[i] = Math.max(dp[j] + 1,dp[i]);
                if(LIS[i].length < LIS[j].length + 1) {
                    // 同时抽取子序列
                    LIS[i] = [...LIS[j],nums[i]];
                }
            }
        }
    }
    // 显示子序列
    console.log(LIS);
    let res = 0;
    for(let i=0;i<dp.length;i+=1) {
        res = Math.max(res,dp[i]);
    }
    return res;
};



/* 设计问题 二叉树的序列化与反序列化 Begin*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode  (val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(root === null) return '';
    const treeList = [root];
    const dp = [];
    
    while(treeList.length !== 0) {
        let node = treeList.shift();
        if(node) {
            dp.push(node.val);
            treeList.push(node.left);
            treeList.push(node.right);
        }else{
            dp.push(null);
        }
    }
    
    return JSON.stringify(dp);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(data === '') return null;
    
    // "[1,2,3,1,3,2,4,null,null,null,null,null,null,null,null]"
    const treeList = JSON.parse(data);
    const rootVal = treeList.shift();
    const root = new TreeNode(rootVal);
    
    const levelNodeList = [root];
    while(levelNodeList.length !== 0) {
        let parent = levelNodeList.shift();
        if(parent === null) continue;

        let letfNode = null,
            rightNode= null;

        let leftVal = treeList.shift(),
            rightVal = treeList.shift();

        if(leftVal !== null) {
            letfNode = new TreeNode(leftVal);
        }

        if(rightVal !== null) {
            rightNode = new TreeNode(rightVal);
        }

        parent.left = letfNode;
        parent.right = rightNode;

        levelNodeList.push(letfNode,rightNode);
    } 
    
    return  root;
};

/* 设计问题 二叉树的序列化与反序列化 End */



/**
 * @name leetcode 阶乘后的零 
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    if(n === 0) return 0;
    // n = 5 时就会有1个0，n = 10 时会有 两个0，可以将 n/ 10 得到因子只含有一个5时的0的个数。之后，再将 n / 25 （因为 25 = 5 * 5）得到因子含有两个5时的0的个数。依次 n/125…
    let count = 0;
    while(n>1) {
        n = parseInt(n/5,10);
        count += n;
    }
    return count;
};


/**
 * @param {string} s
 * @return {number}
 * @name leetcode Excel表列序号
 */
var titleToNumber = function(s) {
    if(s.length === 0) return 0;
    // 本质上就是 26 进制技计数，不同的位数 分别为：个，十，百，千，万，亿……
    const charMap = {A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9, J:10, K:11, L:12, M:13, N:14, O:15, P:16, Q:17, R:18, S:19, T:20, U:21, V:22, W:23, X:24, Y:25, Z:26};
    
    // 记录位数
    let unit = 0;
    let nums = 0;
    // 循环使用
    let digit = s.length-1;
    
    while(digit >= 0) {
        // Math.pow(26,unit) 相当于 个位：10^0 ，十位：10^1  千位: 10^2  万：10^3 ....
        nums +=  charMap[s[digit]] * Math.pow(26,unit);
        unit += 1;
        digit -= 1;
    }
     
    return nums;
};


/**
 * @name leetcode Pow(x, n)
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(n==0) return 1;
    if(n==1) return x;
    if(x==0) return 0;
    if(x==1) return 1;
    

    const powerSymbol = n > 0 ? 1 : -1;
    
    n*=powerSymbol;
    
    let result = 1;
    
    while(n>0) {
        // 按位与操作，奇数等于成立，反之亦然
        if(n & 1 === 1) {
            // 因为是奇数 ，那么二进制的最后一位就是 1，在后面右移一位的时候除了位数的次幂以外，还包括这个1本身所代表的一位，所以在此处做处理
            // 任何数字右移动都会到达 n === 1 的情况
            result*=x;
        }
        // 注意 n 是 x 的次幂，第一次右移一位相当于 x*x ，第二次右移一位相当于 (x*x) * (x*x) ,一次类推  ，右移与除以二相同
        n = Math.floor(n/2);
        x*=x;
    }
    
    if(powerSymbol>0) {
        return result;
    }else{
        return 1.0/result;
    }
};


/**
 * leetcode x 的平方根
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if(x<=1) return x;
    
    let r =  Math.floor(x/2);
    let l = 1;
    let result = 0;
    while(l<=r) {
        const mid = Math.floor((l+r)/2);
        const temp = Math.pow(mid,2);
        if(temp === x) {
            return mid;
        }else if(temp < x) {
            // 关键点： x 的平方根必须是 x<= mid^2 即 mid<=lgX, 大于则肯定不是。 所以本题目最终目的就是找到一个 数 n , Math.pow(n,2)<= x < pow(n+1,2)
            // 所以这里每次机会记录一下 Math.pow(n,2)< x 时的 n ,当循环结束的时候就找到了需要的结果
            result = mid;
            l = mid+1;
        }else{
            r = mid-1;
        }
    }
    
    return result;
};

/**
 * @nanme leetcode 两数相除
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    const Max_Number = Math.pow(2,31)-1;
    
    if(divisor ===1 || divisor===-1) {
        let ret = dividend * divisor;
        return ret > Max_Number ? Max_Number : ret;       
    }
    
    if(dividend===1 || dividend===-1) {
        return 0;
    }
    
    const dividendFlag = dividend>0 ? 1 : -1;
    const divisorFlag = divisor>0 ? 1 : -1
    const flag = dividendFlag * divisorFlag; 
    
    dividend = dividend * dividendFlag;
    divisor  = divisor  * divisorFlag;
    
    let l = 0,
        r = dividend;
    let result = 0;
    
    while(l<=r) {
        let mid = Math.floor((l+r)/2);
        let temp = mid * divisor;
        
        if(temp===dividend) {
            return mid * flag;
        }else if(temp<dividend) {
            // 因为最终取得都是整数所以： 商 * 除数 <= 被除数 &&  商 >= 0 , 也就是在 [0 , dividend(被除数)] 之间找到一个数 n ,  n*divisor <= dividend < (n+1)*divisor
            reult = mid;
            l = mid+1;
        }else{
            r = mid-1;     
        }
    }
    
    return reult * flag;
    
};

/**
 * @nanme leetcode 分数到小数
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function(numerator, denominator) {
    /*特殊条件判断*/
    
    // 分子为0，全部为0
    if(numerator===0) return  '0';
    // 分母为0，为空
    if(denominator === 0) return '';
    // 分母为1，结果为分子本身，注意符号
    if(denominator === -1 || denominator === 1) return numerator * denominator + '';
    
    
    
    const numeratorflag = numerator> 0 ? 1 : -1;
    const denominatorflag = denominator > 0 ? 1 : -1;
    const flag = numeratorflag * denominatorflag;
    
    numerator *= numeratorflag;
    denominator *= denominatorflag;
    
    // 整数部分处理 
    result = parseInt(numerator / denominator,10) + '';
    if(numerator>denominator) {
        result = parseInt(numerator / denominator,10) + '';
    }else{
        result = '0';
    }
    
    let rest = numerator % denominator;
    if( rest=== 0)  return result; 
    
    let decimalStr = '';
    const tempArr = [];
    
    // 代码核心:当余数变为 0 时候，说明数字除尽了。当余数重复的时候说明开始无限循环了，本质上是，‘除法运算的算法实现，被除数小于除数补0，被除数乘 10，……’
    while(rest !==0 && !tempArr.includes(rest)) {
        const temp = rest*10;
        if(temp<denominator) {
            // 余数乘 10 还是小于除数，则继续补0，乘 10,……
            decimalStr += '0';
        }else{
            // 开始新的除法
            decimalStr += parseInt(temp/denominator,10);
        }
        
        tempArr.push(rest);
        rest = temp % denominator;
    }
    
    if(rest!==0) {
        // tempArr 记录每次相除后的余数，最后当余数还存在，则说明该数字无限循环，那么在余数数组中该余数的第一次出现，直至结束位置的长度就是该循环的长度
        const reIndex = tempArr.indexOf(rest);
        // [0,rest) 为正常部分，[rest,length-1] 为循环部分
        decimalStr = `${decimalStr.substring(0,reIndex)}(${decimalStr.substring(reIndex)})`;
    }
    
    
    if(flag > 0) {
        return `${result}.${decimalStr}`;
    }else{
        return `-${result}.${decimalStr}`;
    }
};

/**
 * @name leetcode 最长连续递增序列
 * @param {number[]} nums
 * @return {number}
 */
// 滑动窗口实现
var findLengthOfLCIS = function(nums) {
    if(nums.length === 0) return 0; 
    
    let maxLength = 1,
        j=0;
    
    for(i=1;i<nums.length ; i+=1) {
        if(nums[i-1] < nums[i]) {
            maxLength = Math.max(maxLength,(i-j+1));
        }else{
           j=i;
        }
    }
    
    return maxLength;
};

/**
 * @name leetcode 最长连续递增序列
 * @param {number[]} nums
 * @return {number}
 */
// leetcode 动态规划实现
var findLengthOfLCIS = function(nums) {
    if(nums.length === 0) return 0; 
    let lcisList = Array(nums.length).fill(1);
    
    let maxLength = 1;
    for(let i=1;i<nums.length;i+=1) {
        if(nums[i-1]<nums[i]) {
           lcisList[i] += lcisList[i-1];
        }
        maxLength = Math.max(maxLength,lcisList[i]);
    }
    
    return maxLength;
};


/**
 * @name leetcode 最长连续序列
 * @param {number[]} nums
 * @return {number}
 */
// 初级版本
var longestConsecutive1 = function(nums) {
    if(nums.length === 0) return 0;
    let longest = 0;
    let map = {};
    
    for(let i=0;i<nums.length;i+=1) {
        if(!map[nums[i]]) {
            map[nums[i]] = 1;
            let value1,value2; 
            let count = 1;

            value1 = value2 = nums[i];

            while(map[value1+1] !== void 0) {
                count  += 1;
                value1 += 1;
            }

             while(map[value2-1]  !== void 0) {
                count  += 1;
                value2 -= 1;
            }

            longest = Math.max(longest,count);
        }
    }
    
    return longest;
};

/**
 * @name leetcode 最长连续序列
 * @param {number[]} nums
 * @return {number}
 * @desc: 思路与上面的其实是一样的，但是不同点在于首先 item 都给放到了 hashTable 中，然后再遍历整个 hashTable ，找到每一个连续序列的最小值开始同统计，节省大量时间
 */
// 进阶版本
var longestConsecutive2 = function(nums) {
    if(nums.length === 0) return 0;
    let longest = 0;
    let map = {};
    // 关键点1： 所有 item 都已保存进入 map
    nums.forEach(item => {map[item] = 1;});
    nums.forEach((item)=>{
        let count = 1;
        let currentItem = item;
        // 关键点2：只从每个连续序列的最小值开始统计
        if(map[item-1] === undefined) {
            while(map[currentItem+1] !== undefined) {
                count+=1;
                currentItem+=1;
            }
            longest  = Math.max(longest,count);
        }
    });
    
    return longest;
};


/**
 * @name leetcode 岛屿的最大面积
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let maxAreas = 0;
    const mark = Infinity;
    const yLength = grid.length;
    const xLength = grid[0].length;
    // 四个搜索的方向
    const dir = [
        // 上
        {
            x:0,
            y:-1
        },
        // 右
        {
            x:1,
            y:0
        },
        // 下
        {
            x:0,
            y:1
        },
        // 左
        {
            x:-1,
            y:0
        }
    ];
    
    const findIsland = (i,j,count)=>{
        if(i<0 || i>=yLength || j<0 || j>=xLength || grid[i][j]!==1) return count;
        
        count+=1;
        grid[i][j] = mark;
        
        dir.forEach(({x,y})=>{
            count = findIsland(i+y,j+x,count);
        });
        
        return count;
    }
    
    for(let i=0;i<yLength;i+=1) {
        for(let j=0;j<xLength;j+=1) {
            if(grid[i][j] !== 1) continue;
            const size = findIsland(i,j,0);
            
            maxAreas = Math.max(maxAreas,size);
        }
    }
    
    return maxAreas;
};


/**
 * @name leetcode 简化路径
 * @param {string} path
 * @return {string}
 * @desc 使用栈来解决，['','.'] 直接过，'..' 出栈，其他入栈，最后输出栈就可以了
 */
var simplifyPath = function(path) {
    const noEffects = ['','.'];
    const out = '..';
    
    const pathList = path.split('/')
    const stack = [];
    
    for(let i=0;i<pathList.length;i+=1) {
        const char = pathList[i];
        if(noEffects.includes(char)) continue;
        if(out === char) {
            stack.pop()
        }else{
            stack.push(char);
        }
    }
    
    return '/' + stack.join('/');
};