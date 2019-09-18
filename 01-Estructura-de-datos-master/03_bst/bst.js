BinarySearchTree = function(value) {
  this.value = value;
  this.right = null;
  this.left = null;
  this.length = 1;
};
BinarySearchTree.prototype.insert = function(value) {
  if (value < this.value) {
    if (!this.left) {
      this.left = new BinarySearchTree(value);
      this.length++;
    } else {
      this.left.insert(value);
    }
  }
  if (value > this.value) {
    if (!this.right) {
      this.right = new BinarySearchTree(value);
      this.length++;
    } else {
      this.right.insert(value);
    }
  }
};
BinarySearchTree.prototype.contains = function(input) {
  if (input === this.value) {
    return true;
  }
  if (input < this.value && this.left) {
    return this.left.contains(input);
  }
  if (input > this.value && this.right) {
    return this.right.contains(input);
  }
  return false;
};
BinarySearchTree.prototype.depthFirstForEach = function(fn, opcion) {
  console.log(fn);
  if (opcion === "in-order" || opcion === undefined) {
    //izquierda, proceso, derecha
    if (this.left) {
      this.left.depthFirstForEach(fn, opcion);
    }
    fn(this.value);
    if (this.right) {
      this.right.depthFirstForEach(fn, opcion);
    }
  }
  if (opcion === "pre-order") {
    //proceso, izquierda, derecha
    fn(this.value);
    if (this.left) {
      this.left.depthFirstForEach(fn, "pre-order");
    } else if (this.right) {
      this.right.depthFirstForEach(fn, "pre-order");
    }
    //this.value.depthFirstForEach(fn, 'pre-order')
  }
};
BinarySearchTree.prototype.breadthFirstForEach = function() {};
BinarySearchTree.prototype.size = function() {
  return this.length;
};
