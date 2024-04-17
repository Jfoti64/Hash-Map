import Node from './node';

class HashMap {
  constructor() {
    this.buckets = Array(31).fill(null);
    this.size = 0; // Keep track of the total number of entries
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  resize() {
    const newBucketsSize = this.findNextPrime(this.buckets.length * 2);
    const newBuckets = Array(newBucketsSize).fill(null);

    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        const index = this.rehash(currentNode.key, newBucketsSize);
        const newNode = new Node(currentNode.key, currentNode.value);
        newNode.next = newBuckets[index];
        newBuckets[index] = newNode;
        currentNode = currentNode.next;
      }
    });

    this.buckets = newBuckets;
  }

  static rehash(key, newSize) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % newSize;
    }
    return hashCode;
  }

  findNextPrime(num) {
    let candidate = num; // Create a local copy of num
    while (!this.isPrime(candidate)) {
      candidate += 1; // Modify the local copy instead of the parameter
    }
    return candidate;
  }

  static isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i += 1) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  set(key, value) {
    if (this.size / this.buckets.length > 0.75) {
      this.resize();
    }

    const index = this.hash(key);
    const newNode = new Node(key, value);
    let currentNode = this.buckets[index];

    if (!currentNode) {
      this.buckets[index] = newNode;
      this.size += 1;
    } else {
      let prevNode = null;
      while (currentNode) {
        if (currentNode.key === key) {
          currentNode.value = value;
          return;
        }
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
      prevNode.next = newNode;
      this.size += 1;
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

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        values.push(currentNode.value);
        currentNode = currentNode.next;
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        const innerArray = [currentNode.key, currentNode.value];
        entries.push(innerArray);
        currentNode = currentNode.next;
      }
    });
    return entries;
  }
}

export default HashMap;
