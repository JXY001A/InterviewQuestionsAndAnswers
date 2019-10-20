/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-28 12:33:14
 */
const root = {
    val:1,
    left:{
        val:2,
        left:null,
        right:null,
    },
    right:{
        val:3,
        left:{
            val:4,
            left:null,
            right:null,
        },
        right:{
            val:5,
            left:null,
            right:null,
        },
    }
};

var serialize = function(root) {
    const treeList = [root];
    const dp = [];
    debugger;
    while(treeList.length) {
        let node = treeList.unshift();
        if(node) {
            dp.push(node.val);
            treeList.push(node.left);
            treeList.push(node.right);
        }else{
            dp.push(null);
        }
    }
    
    return JSON.toString(dp);
};

serialize(root);