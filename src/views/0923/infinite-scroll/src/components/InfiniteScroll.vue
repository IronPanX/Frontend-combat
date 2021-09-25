<template>
  <div class="scroll">
    <p>INFINITE SCROLL</p>
    <div ref="container" class="scroll-container">
      <ul ref="list" class="scroll-list">
        <li v-for="item in list" :key="item.id" class="scroll-item">
          {{ item.id }} {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfiniteScroll",
  data() {
    return {
      element: {},
      container: {},
      distance: 200,
      index: 0,
      list: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis corporis cupiditate, dignissimos dolore ducimus eum eveniet ipsam nisi omnis optio quae quasi qui quos sapiente similique ullam vel. Quae, qui?'
    }
  },
  mounted() {
    this.initEl()
    this.handleScroll()
    this.getList()
  },
  methods: {
    initEl() {
      this.element = this.$refs.list
      this.container = this.$refs.container
    },

    getList() {
      for (let i = 0; i < 10; i++) {
        this.list.push({
          id: ++this.index,
          text: Math.random() > 0.5 ? this.text + this.text : this.text
        })
      }
    },

    handleScroll() {
      this.container.addEventListener('scroll', () => {
        const heightBelowTop = this.element.offsetHeight + this.element.getBoundingClientRect().top - this.container.getBoundingClientRect().top;
        const offsetHeight = this.container.offsetHeight;
        const borderBottom = Number.parseFloat(getComputedStyle(this.container).borderBottomWidth);
        if ((heightBelowTop - offsetHeight + borderBottom) <= this.distance) {
          console.log('LOADING!!!')
          this.getList()
        }
      })
    }
  }
}
</script>

<style>
.scroll-container {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 60%;
  height: 640px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid lightgray;
  overflow: auto;
}

.scroll-list {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 14px;
  -moz-border-radius: 14px;
  border-radius: 14px;
  list-style: none;
}

.scroll-item {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background-color: lightgray;
}
</style>
