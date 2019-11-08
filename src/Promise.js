/*
 * @description: 
 * @author: JXY
 * @Date: 2019-11-07 16:20:15
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-11-07 16:54:46
 */
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;


function INTERNAL() {}

function isFunction(func) {
    return typeof func === 'function';
}

function isObject(obj) {
    return typeof obj === 'object';
}

function safelyResolveThen(self,then) {
    var called = false;
    try {
        then(
            function(value) {
                if(called) {
                    return;
                }
                called = true;
                doResolve(self,value);
            },
            function(error) {
                if(called) {
                    return;
                }
                called = true;
                doReject(self,error);
            }
        );
    }catch(error) {
        if(called) {
            return;
        }
        called = true;
        doReject(self,error);
    }
}

function doResolve(self,value) {
    try {
        var then = getThen(value);
        if(then) {
            safelyResolveThen(self,then);
        }else{
            self.state = FULFILLED;
            self.value = value;
            self.queue.forEach(function(queueItem) {
                queueItem.callFulfilled(value);
            });
        }
        return self;
    } catch (error) {
        return doReject(self,error);
    }
}


function doReject(self,error) {
    self.state = REJECTED;
    self.value = error;
    self.queue.forEach(function(queueItem) {
        queueItem.callRejected(error);
    });

    return self;
}


function Promise(resolver) {
    if(!isFunction(resolver)) {
        throw new TypeError('reslover must be a function');
    }
    this.state = PENDING;
    this.value = void 0;
    this.queue = [];

    if(resolver !== INTERNAL) {
        safelyResolveThen(this,resolver);
    }

}


Promise.prototype.then = function() {}
Promise.prototype.catch = function() {}

Promise.prototype.resolve = function() {}
Promise.prototype.reject = function() {}
Promise.prototype.all  = function() {}
Promise.prototype.race = function() {}

