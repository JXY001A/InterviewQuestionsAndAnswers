/*
 * @description: 最大堆的生成优化 --- heapify  接受一个数组，然后从最后一个叶子节点的父节点开始执行shiftDown操作，直到根节点，形成以客完全二叉树
 * @author: JXY
 * @Date: 2019-08-06 21:59:50
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-06 22:21:12
 */

class MaxHeap {
    constructor(numsArray) {
        const len = numsArray.length;
        this.data = new Array(len + 1);
        this.capacity = len;
        numsArray.forEach((item, index) => {
            this.data[index + 1] = item;
        });
        this.count = len;
        let i = Math.floor(this.count / 2);
        for (i; i >= 1; i -= 1) {
            this._shiftDown(i);
        }
    }

    _swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    _shiftDown(k) {
        //  叶子节点无需判断，只有含子节点的节点才有资格shiftDowm
        while (2 * k <= this.count) {
            let j = 2 * k;
            if (j + 1 <= this.count && this.data[j + 1] > this.data[j])
                j += 1;

            if (this.data[k] >= this.data[j]) break;

            this._swap(this.data, j, k);
            k = j;
        }
    }

    _shiftUp(k) {
        while (k > 1 && this.data[parseInt(k / 2, 10)] < this.data[k]) {
            this._swap(this.data, parseInt(k / 2, 10), k);
            k = parseInt(k / 2, 10);
        }
    }

    clearHeap() {
        this.data = [];
        this.count = 0;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.count === 0;
    }
    insert(item) {
        if (this.count + 1 > this.capacity)
            return;
        this.data[this.count + 1] = item;
        this._shiftUp(this.count + 1);
        this.count += 1;
    }
    extracMax() {
        if (this.count <= 0) return void 0;
        let result = this.data[1];
        this._swap(this.data, 1, this.count);
        this.count -= 1;
        this._shiftDown(1);
        return result;
    }
    getMax() {
        if (this.count > 0) {
            return data[1];
        }
        return undefined;
    }
}


// test
const a = [
    3,
    1,
    5,
    4,
    6,
    10,
    2,
    8,
    7,
    9,
]

const maxHeap = new MaxHeap(a);
while(!maxHeap.isEmpty()) {
    console.log(maxHeap.extracMax())
}