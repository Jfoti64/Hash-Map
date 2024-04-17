import Node from './node';

class HashMap {
  constructor() {
    this.buckets = Array(31).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const newNode = new Node(key, value);
    let currentNode = this.buckets[index];

    if (!currentNode) {
      this.buckets[index] = newNode;
    } else {
      let prevNode = null;
      while (currentNode) {
        if (currentNode.key === key) {
          currentNode.value = value; // Update the value if the key matches
          return;
        }
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
      prevNode.next = newNode; // Add new node at the end of the list
    }
  }

  get(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];

    if (!currentNode) {
      return null;
    }
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];

    if (!currentNode) {
      return false;
    }
    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];

    if (!currentNode) {
      return false; // Early return if the bucket is empty
    }

    let prevNode = null;
    while (currentNode) {
      if (currentNode.key === key) {
        // If it's the first node in the bucket
        if (!prevNode) {
          this.buckets[index] = currentNode.next;
        } else {
          // Otherwise, bypass the current node
          prevNode.next = currentNode.next;
        }
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    return false;
  }

  length() {
    let length = 0;
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        length += 1;
        currentNode = currentNode.next;
      }
    });
    return length;
  }

  clear() {
    this.buckets.fill(null); // Reset all buckets to null
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        keys.push(currentNode.key);
        currentNode = currentNode.next;
      }
    });
    return keys;
  }

  
}

export default HashMap;
