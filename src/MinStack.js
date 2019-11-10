/*
 * @description: 
 * @author: JXY
 * @Date: 2019-11-10 13:05:27
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-11-10 13:05:34
 */
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    let minTop = this.minStack[this.minStack.length - 1];
    if( minTop !== void 0) {
        if(minTop >= x) {
            this.minStack.push(x); 
        }
    }else{
        this.minStack.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let stackTop = this.stack.pop();
    if(stackTop === this.minStack[this.minStack.length - 1]) {
        this.minStack.pop();
    }
    return stackTop;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return  this.stack[this.stack.length-1] || null;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return  this.minStack[this.minStack.length-1] || null;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */