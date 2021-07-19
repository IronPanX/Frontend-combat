<template>
  <div>
    <h2>10进制浮点转64进制</h2>
    计算方式：
    <br>
    <label>基于整数存取<input v-model="calType" name="calType" type="radio" value="INT"></label>
    <br>
    <label>基于小数存取（保留12位编码）<input v-model="calType" name="calType" type="radio" value="DEC"></label>
    <br>
    <input v-model="inputNum" placeholder="输入10进制浮点数" type="number">&nbsp;
    <button @click="encode">Encode</button>&nbsp;
    <span>结果：{{ outputStr }}</span>
    <br>
    <input v-model="inputStr" placeholder="输入64进制编码">&nbsp;
    <button @click="decode">Decode</button>&nbsp;
    <span>结果：{{ outputNum }}</span>
  </div>
</template>

<script>
export default {
  name: "DecFloatTo64Base",
  data() {
    return {
      Char64Enum: {},
      inputNum: '',
      inputStr: '',
      outputStr: '',
      outputNum: '',
      calType: 'INT'
    }
  },
  created() {
    this.initEnum()
  },
  methods: {
    initEnum() {
      const Char64Arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("")
      Char64Arr.forEach((char, index) => {
        this.Char64Enum[this.Char64Enum[index] = char] = index
      })
      Object.freeze(this.Char64Enum)
    },

    getKey(val) {
      return this.Char64Enum[parseInt(val)]
    },

    getVal(key) {
      return this.Char64Enum[key.toString()]
    },

    to64INT(str) {
      let num = parseInt(str)
      let remArr = []
      let result = ''
      while (num >= 64) {
        remArr.push(num % 64)
        num = Math.floor(num / 64)
      }
      remArr.push(num)
      remArr.reverse()
      remArr.forEach(num => {
        result = result + this.getKey(num)
      })

      return result
    },

    to64DEC(str) {
      let num = parseFloat('0.' + str)
      let remArr = []
      let result = ''
      while (num !== 0 && remArr.length < 12) {
        let tempArr = (num * 64).toString().split('.')
        remArr.push(tempArr[0])
        num = parseFloat('0.' + tempArr[1])
      }
      remArr.forEach(num => {
        result = result + this.getKey(num)
      })

      return result
    },


    encode() {
      let pointIndex = '', int64 = '', dec64 = '', isFloat='0'
      let numArr = Math.abs(parseFloat(this.inputNum)).toString().split('.')
      let pm = this.inputNum > 0 ? '1' : '0'
      int64 = this.to64INT(numArr[0])

      if (numArr[1]) {
        pointIndex = this.to64INT(int64.length)
        isFloat = '1'
        if (this.calType === 'INT') {
          dec64 = this.to64INT(numArr[1])
        } else {
          dec64 = this.to64DEC(numArr[1])
        }
      } else {
        pointIndex = this.to64INT('0')
        dec64 = ''
      }

      // 符号 + 点位置 + 整数部分 + 小数部分
      this.outputStr = pm + isFloat + pointIndex + int64 + dec64
    },

    to10INT(str) {
      let result = 0
      let length = str.length
      for (let i = 0; i <= length - 1; i++) {
        result += this.getVal(str[length - 1 - i]) * Math.pow(64, i)
      }
      return parseInt(result)
    },

    to10DEC(str) {
      let result = 0
      let length = str.length
      for (let i = 0; i <= length - 1; i++) {
        result += this.getVal(str[i]) * Math.pow(64, (-i - 1))
      }
      return parseFloat(result)
    },

    decode() {
      let pm = this.getVal(this.inputStr[0])
      let isFloat = this.getVal(this.inputStr[1])
      let pointIndex = this.getVal(this.inputStr[2])
      let intStr = isFloat === 1 ? this.inputStr.slice(3, pointIndex + 3) : this.inputStr.slice(pointIndex + 3)
      let decStr = isFloat === 1 ? this.inputStr.slice(pointIndex + 3) : ''

      if (this.calType === 'INT') {
        this.outputNum = (pm === 1 ? '' : '-') + (intStr ? this.to10INT(intStr): 0) + (isFloat === 1 ? '.' : '') + (decStr ? this.to10INT(decStr) : '')
      } else {
        this.outputNum = (pm === 1 ? '' : '-') + (this.to10INT(intStr) + this.to10DEC(decStr))
      }
    }
  }
}
</script>

<style scoped>

</style>
