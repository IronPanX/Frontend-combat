<template>
  <div class="main-container">
    <nav class="title">
      <a v-for="(item, index) in 10" :key="index" class="title-item" @click="handleClick(item)">{{ item }}</a>
    </nav>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: "Read",
  data() {
    return {
      content: 'ARITCLE 1 >>>>>>' +
          '      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore pariatur provident sequi soluta! Architecto aut, commodi eaque iure nemo nesciunt nihil officiis placeat quos rerum sequi tempora temporibus voluptatum. Ipsum!'
    }
  },
  methods: {
    handleClick(i) {
      this.content = `ARITCLE ${i} >>>>>>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore pariatur provident sequi soluta! Architecto aut, commodi eaque iure nemo nesciunt nihil officiis placeat quos rerum sequi tempora temporibus voluptatum. Ipsum!`
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: black;
}

.title {
  display: flex;
  flex-direction: column;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  padding: 15px;
  margin-right: 15px;
  background-color: white;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.title-item {
  display: block;
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
  background-color: lightgray;
  line-height: 30px;
  text-align: center;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.title-item:hover {
  color: white;
  background-color: gray;
}

.content {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  flex: 1;
  top: 0;
  bottom: 0;
  padding: 15px;
  margin-left: 15px;
  background-color: white;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

</style>
