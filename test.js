function flattenRecursively(arr, result = []) {
    for (let i = 0; i < arr.length; i++) {
      Array.isArray(arr[i])
        ? result.push(...flattenRecursively(arr[i]))
        : result.push(arr[i]);
    }
    return result;
  }
  
  console.log(flattenRecursively([1, [2, 3, [4]]])); //-> [1, 2, 3, 4]
  console.log(flattenRecursively([1, {}, [3, [[4]]]])); //-> [1, {}, 3, 4]
  
  /**
   * returns every sequence of throws a single player could throw over an n-round game of rock-paper-scissors
   * rockPaperScissors(1); -> [['rock'],['paper'],['scissors']]
   * rockPaperScissors(2); ->
   * [['rock','rock'],['rock','paper'],['rock','scissors'],
   * ['paper','paper'],['paper','scissors'],['paper','rock'],
   * ['scissors','scissors'],['scissors','paper'],['scissors','rock']]
   */
  // [r] [p] [s]
  // [rr] [rp] [rs] [pr] [pp] [ps] [sr] [sp] [ss]
  // [rrr] [rrp] [rrs] [rpr] [rpp] [rps] [rsr] [rsp] [rss] [prr] [prp] [prs] [ppr] [ppp] [pps] [psr] [psp] [srr] [srp] [srs] [spr] [sps] [ssr] [ssp] [sss]
  
  function rockPaperScissorsR(n, subarray = [], result = []) {
    if (n === 0) return result;
  
    if (subarray.length === n) result.push(subarray);
  
    rockPaperScissorsR(n, subarray.concat("rock"), result);
    rockPaperScissorsR(n, subarray.concat("paper"), result);
    rockPaperScissorsR(n, subarray.concat("scissors"), result);
  
    return result;
  }
  
  // console.log(rockPaperScissorsR(2));
  
  function mergeSort(arr) {
    // recursively slice ea arr til length is 0 or 1 (sorted)
    // base case
    if (arr.length <= 1) return arr;
  
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid)),
      right = mergeSort(arr.slice(mid));
  
    console.log("left and right", [left, right]);
  
    const merge = (left, right) => {
      const result = [];
      let i = 0,
        j = 0;
  
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
      }
      // if one of the arrays is done while looping but the other still has elements in it
      while (i < left.length) {
        result.push(left[i++]);
        // i++
      }
  
      while (j < right.length) {
        result.push(right[j++]);
        // j++
      }
  
      return result;
    };
    return merge(left, right);
  }
  
  console.log(mergeSort([2, 1, 8, 5, 7, 3, 2]));
  
  function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
    console.log(arr);
    return arr;
  }
  
  console.log(bubbleSort([2, 1, 8, 5, 7, 3, 2]));
  
  function insertionSort(arr) {
    // consider the first el sorted
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      // let temp = i - 1;
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        console.log(i, arr);
        console.log(j, arr);
        arr[j + 1] = arr[j];
        console.log(i, arr);
        console.log(j, arr);
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  }
  
  // console.log(insertionSort([5,4,3,2,1]))
  // console.log(insertionSort([2, 1, 8, 5, 7, 3, 2]));
  
  /**
   *
   *  How many unique ways can one move from one corner of a n x n board to the other corner.
   *  You can move up, down, left, and right. You cannot visit spots that you have visited already.
   *  Make your solution work for a grid of any size.
   *
   */
  
  // do not use any native array methods
  function Stack() {
    this.storage = {};
    this.index = 0;
  }
  
  Stack.prototype.push = function (...value) {
    value.forEach((value) => {
      this.storage[this.index++] = value;
    });
  };
  
  Stack.prototype.pop = function () {
    this.index--;
    let popped = this.storage[this.index];
    delete this.storage[this.index];
    return popped;
  };
  
  const testStack = new Stack();
  
  testStack.push(1, 2, 3);
  testStack.pop();
  console.log(testStack.storage);
  
  // do not use any native array methods
  function Queue() {
    this.storage = {};
    // store first and last indices
    this.first = 0;
    this.last = 0;
  }
  
  Queue.prototype.enqueue = function (value) {
    this.storage[this.last++] = value;
  };
  
  Queue.prototype.dequeue = function () {
    if (this.first === this.last) return;
    //return from the head
    let dequeued = this.storage[this.first];
    delete this.storage[this.first++];
    return dequeued;
  };
  
  const newQueue = new Queue();
  newQueue.enqueue(1);
  newQueue.enqueue(2);
  newQueue.enqueue(3);
  console.log(newQueue.dequeue());
  console.log(newQueue.storage);
  
  const testQueue = new Queue();
  testQueue.enqueue(10);
  testQueue.enqueue(11);
  testQueue.dequeue();
  console.log(testQueue);
  
  function LinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  function Node(val) {
    this.value = val;
    this.next = null;
  }
  
  // adds node to end of list
  LinkedList.prototype.push = function (value) {
    this.length++;
    const newNode = new Node(value);
    console.log(newNode);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      // this.head.next = this.tail;
    } else {
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
  };
  
  // returns true if value is present in the list
  LinkedList.prototype.contains = function (value) {
    //start from the head
    let current = this.head;
    //traverse the linked list
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  };
  
  const list = new LinkedList();
  list.push(1);
  list.push(2);
  list.push(3);
  console.log(list.contains(2));
  console.log(list.contains(3));
  // console.log(list.head)
  console.log(list);
  
  // Bonus
  // adds node to beginning of list
  LinkedList.prototype.addToHead = function (value) {
    let newNode = new Node(value);
    let currentHead = this.head;
    this.head = newNode;
    newNode.next = currentHead;
    this.length++;
    return this.head;
  };
  
  list.addToHead(0);
  console.log(list);
  
  // Extra Bonus
  // insert an item at the position specified
  LinkedList.prototype.insert = function (value, position) {
    let newNode = new Node(value);
    if (position === 0) this.addToHead(value);
    let currId = 1;
    let curr = this.head.next;
    let prev = this.head;
    while (curr) {
      if (currId === position) {
        newNode.next = curr;
        prev.next = newNode;
      }
      prev = curr;
      curr = curr.next;
      currId++;
    }
  };
  list.insert(100, 2);
  console.log(list);
  
  // Extra Bonus
  // remove first occurrence of value from list
  LinkedList.prototype.removeItem = function (value) {
    let current = this.head;
    if (current.value === value) {
      let head = this.head;
      this.head = this.head.next;
      return head;
    }
    //go thru the list
    let next = current.next;
    let targetNode;
    while (next) {
      if (next.value === value) {
        targetNode = next;
        current.next = next.next;
        if (current.next === null) this.tail = current;
      }
      current = next;
      next = next.next;
    }
  
    return targetNode;
  };
  
  console.log(list.removeItem(3));
  console.log(list);
  
  // Extra Bonus
  // remove element at specified position in list
  LinkedList.prototype.removePosition = function (position) {};
  
  //input: nothing
  //output: new object with some prototype properties/methods
  
  function HashTable() {
    this.SIZE = 16;
  
    // the array will be instantiated as [undefined, undefined....]
    // pop() and push() shouldn't be used on the storage
    this.storage = new Array(this.SIZE);
  }
  
  HashTable.prototype.set = function (key, value) {};
  
  const testHash = new HashTable();
  testHash.set(1, 1);
  // testHash.set(2, 2);
  // testHash.set(3, 3);
  console.log(testHash);
  
  HashTable.prototype.get = function (key) {};
  
  // returns the value associated to the key, and removes that value from the hash table
  HashTable.prototype.remove = function (key) {};
  
  // returns a number between 0 and size that is unique* and generated from the the inputted string
  // input is string(this will be the key) and size(size of the hash table)
  
  function hashCode(string, size) {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      const letter = string.charCodeAt(i);
      hash = (hash << 5) - hash + letter;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % size;
  }
  
  function BinarySearchTree(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
  
  BinarySearchTree.prototype.add = function (value) {
    let node = new BinarySearchTree(value);
    if (this.value > value) {
      this.left === null ? this.left = node : this.left.add(value)
    } else {
      this.right === null ? this.right = node : this.right.add(value)
    }
  };
  
  
  
  BinarySearchTree.prototype.contains = function (value) {
    if (this.value === value) return true;
    if (this.value > value) {
      return this.left === null ? false :  this.left.contains(value);
    } else {
      return this.right === null ? false : this.right.contains(value);
    }
  };
  // 3, 4, 5, 11, 12
  const bst = new BinarySearchTree(10)
  bst.add(3)
  bst.add(5)
  bst.add(4)
  bst.add(11)
  bst.add(12)
  console.log(bst)
  console.log(bst.contains(12))
  
  // applies the callback in the order of depth first (preorder)
  BinarySearchTree.prototype.depthFirstPre = function (callback) {};
  
  // applies the callback in the order of depth first (inorder)
  BinarySearchTree.prototype.depthFirstIn = function (callback) {};
  
  // applies the callback in the order of depth first (postorder)
  BinarySearchTree.prototype.depthFirstPost = function (callback) {};
  
  // applies the callback in the order of breath first (level order)
  BinarySearchTree.prototype.breadthFirst = function (callback) {};
  
  // Extra Bonus
  // Return the minimum stored value
  BinarySearchTree.prototype.min = function () {};
  
  // Extra Bonus
  // Return the maximum stored value
  BinarySearchTree.prototype.max = function () {};
  
  // Extra Bonus
  // Return the height of the tree
  BinarySearchTree.prototype.height = function () {};
  
  // Extra Bonus
  // Remove an item from the tree and ensure that the children of the item are properly repositioned
  BinarySearchTree.prototype.remove = function (item) {};
  