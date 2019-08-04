/*
 * @description:  最大堆的实现
 * @author: JXY
 * @Date: 2019-08-04 23:12:42
 * @Email: JXY001a@aliyun.com
 * @LastEditTime: 2019-08-04 23:13:45
 */

class MaxHeap {
    constructor(capacity) {
        this.data = new Array(capacity + 1);
        this.count = 0;
        this.capacity = capacity;
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