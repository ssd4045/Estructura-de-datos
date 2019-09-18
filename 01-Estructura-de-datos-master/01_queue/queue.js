//Enqueue

function Queue() {
  this.counter = 0;
  this.arr = [];
}

Queue.prototype.enqueue = function(arg) {
  if (this.arr[0] === undefined) {
    this.arr[0] = arg;
    this.counter++;
  } else {
    this.arr[this.counter] = arg;
    this.counter++;
  }
};

//Dequeue
Queue.prototype.dequeue = function() {
  let result = this.arr[0];
  let arr1 = [];
  if (this.counter <= 0) {
    return undefined;
  }
  for (var i = 0; i < this.counter - 1; i++) {
    arr1[i] = this.arr[i + 1];
  }
  this.counter--;
  this.arr = arr1;

  return result;
};

//Size
Queue.prototype.size = function() {
  return this.counter;
};
