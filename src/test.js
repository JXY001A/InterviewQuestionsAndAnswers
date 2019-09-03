/*
 * @description: 
 * @author: JXY
 * @Date: 2019-08-28 12:33:14
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-09-02 10:27:14
 */

const head = {
    val:1,
    next:null
};

const n = 1;

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
        tempNode = null;
    }else{
        tempNode.val =  tempNode.next.val ;
        tempNode.next = tempNode.next.next;
    }
    
    return head; 
}
removeNthFromEnd(head,1)