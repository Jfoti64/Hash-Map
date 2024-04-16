class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const newNode = new Node(key, value);

  }
}
