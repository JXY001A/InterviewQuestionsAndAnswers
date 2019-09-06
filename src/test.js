

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
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