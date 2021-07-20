<template>
  <div>
    <h2>实现RENDER函数</h2>
    <button @click="render">渲染</button>
    <br>
    <p>HTML模版：{{ template }}</p>
    <p>模版数据：{{ tmplData }}</p>
    <p>渲染结果:</p>
    <div id="root"></div>
  </div>
</template>

<script>
import logoSrc from '@/assets/logo.png'

export default {
  name: "RenderFunction",
  data() {
    return {
      template: `<div class="newslist">
      <div class="img" v-if="info.showImage"><img src="{{image}}"/></div>
      <div class="date" v-if="info.showDate">{{info.name}}/></div>
      <div class="img">{{info.name}}/></div>
      </div>`,
      tmplData: {
        image: logoSrc,
        info: {showImage: true, showDate: false, name: "aaa"}
      }
    }
  },
  methods: {
    render() {
      alert('RENDER!!!')
    }
  }
}
</script>

<style scoped>

</style>
