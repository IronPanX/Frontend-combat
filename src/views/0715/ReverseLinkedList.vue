<template>
  <div>
    <h2>链表反转</h2>
    <div>
      <button @click="generateList">生成链表</button>
      |
      <button @click="reverseList">反转链表</button>
      <br>
      <p>原始链表: {{ listStr }}</p>
      <p>反转链表: {{ reversedListStr }}</p>
    </div>
  </div>
</template>

<script>
function defaultEquals(a, b) {
  return a === b
}

// 节点类
class Node {
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

// 链表类
class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }

  push(element) {
    const node = new Node(element)
    let current
    if (this.head == null) {
      this.head = node
    } else {
      current = this.head
      while (current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        this.head = current.next
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.size() === 0
  }

  getHead() {
    return this.head
  }

  toStringLL() {
    if (this.isEmpty()) {
      return ''
    }

    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString}, ${current.element}`
      current = current.next
    }
    return objString
  }

  reverse() {
    if (this.isEmpty()) {
      return
    }

    let reversedList = new LinkedList()
    let node = this.head
    let next = null
    let current = null

    while (node != null) {
      next = node.next
      node.next = current
      current = node
      node = next
    }
    reversedList.head = current
    reversedList.count = this.size()
    return reversedList
  }
}

export default {
  name: "ReverseLinkedList",
  data() {
    return {
      list: null,
      listStr: '',
      reversedList: null,
      reversedListStr: ''
    }
  },
  methods: {
    generateList() {
      const list = new LinkedList()
      for (let i = 0; i < 10; i++) {
        list.push(Math.floor(Math.random() * 100))
      }
      this.list = list
      this.listStr = this.list.toStringLL()
    },

    reverseList() {
      this.reversedList = this.list.reverse()
      this.reversedListStr = this.reversedList.toStringLL()
    }
  }
}
</script>

<style scoped>

</style>
