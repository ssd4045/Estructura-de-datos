function LinkedList() {
  this.head = null;
  this.tail = null;
}
function Node(value, next = null, previous = null) {
  this.value = value;
  this.next = next;
  this.previous = previous;
}
LinkedList.prototype.addToHead = function(value) {
  let newNode = new Node(value, this.head, null);
  if (this.head) {
    this.head.previous = newNode;
  } else {
    this.tail = newNode;
  }
  this.head = newNode;
};
LinkedList.prototype.addToTail = function(value) {
  let newNode = new Node(value, null, this.tail);

  if (this.tail) {
    this.tail.next = newNode;
  } else {
    this.head = newNode;
  }
  this.tail = newNode;
};
LinkedList.prototype.removeHead = function() {
  if (!this.head) {
    return null;
  }

  let removedHead = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.previous = null;
  } else {
    this.tail = null;
  }

  return removedHead;
};
LinkedList.prototype.search = function(value) {
  let currentNode = this.head;

  while (currentNode) {
    if (typeof value === "function" && value(currentNode.value)) {
      return currentNode.value;
    } else if (currentNode.value === value) {
      return currentNode.value;
    }
    currentNode = currentNode.next;
  }
  return null;
};
LinkedList.prototype.removeTail = function() {
  if (!this.tail) {
    return null;
  }
  let removedTail = this.tail.value;
  this.tail = this.tail.previous;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  return removedTail;
};
