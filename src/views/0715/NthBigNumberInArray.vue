<template>
  <div>
    <h2>数组中第 K 大的元素</h2>
    <button @click="generateArray">生成数组</button>
    |
    <input v-model="countIndex" :disabled="rawArray.length < 1" type="number">
    <button @click="findEle">查找第{{ countIndex }}大元素</button>
    <br>
    <p>原始数组：[{{ rawArray.toString() }}]</p>
    <p>排序数组：[{{ sortedArray.toString() }}]</p>
    <p>结果：{{ result }}</p>
  </div>
</template>

<script>
export default {
  name: "NthBigNumberInArray",
  data() {
    return {
      rawArray: [],
      sortedArray: [],
      countIndex: 0,
      max: 10,
      result: ''
    }
  },
  methods: {
    generateArray() {
      this.rawArray = []
      for (let i = 0; i < this.max; i++) {
        this.rawArray.push(Math.floor(Math.random() * 100))
      }

    },
    findEle() {
      if (this.countIndex > this.rawArray.length || this.countIndex < 1) {
        alert("超出范围")
        return
      }
      this.sortedArray = []
      this.sortedArray = [...this.rawArray]
      // this.result = this.sortedArray.sort((a, b) => b - a)[this.countIndex - 1]
      this.result = this.quickSelect(this.sortedArray, this.countIndex, 0, this.sortedArray.length - 1)
    },

    quickSelect(arr, pos, left, right) {
      let pivotIndex
      if (left > right) {
        return arr[left]
      }

      pivotIndex = this.partition(arr, left, right)
      if (pos < pivotIndex) {
        return this.quickSelect(arr, pos, left, pivotIndex - 1)
      } else if (pos > pivotIndex) {
        return this.quickSelect(arr, pos, pivotIndex + 1, right)
      } else {
        return arr[pivotIndex - 1]
      }
    },

    quickSort(arr, left, right) {
      let pivotIndex

      if (left > right) {
        return
      }
      pivotIndex = this.partition(arr, left, right)
      this.quickSort(arr, left, pivotIndex - 1)
      this.quickSort(arr, pivotIndex + 1, right)
      return arr
    },

    partition(arr, left, right) {
      let pivotIndex = right
      let pivot = arr[pivotIndex]
      right -= 1

      while (left <= right) {
        // while (arr[left] < pivot) {
        while (arr[left] > pivot) {
          left += 1
        }

        // while (arr[right] > pivot) {
        while (arr[right] < pivot) {
          right -= 1
        }

        if (left >= right) {
          break
        } else {
          [arr[left], arr[right]] = [arr[right], arr[left]]
        }
      }

      [arr[left], arr[pivotIndex]] = [arr[pivotIndex], arr[left]]

      return left
    }
  }
}
</script>

<style scoped>

</style>
