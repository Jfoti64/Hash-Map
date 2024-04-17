class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.buckets = Array(31).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
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
}
