<template>
  <div id="nav">
    <router-link to="/">首页</router-link> |
    <router-link to="/screen-share-send">共享桌面</router-link> |
    <router-link to="/screen-share-receive">接收共享桌面</router-link> |
    <router-link to="/video-chat-host">视频会议（房主）</router-link> |
    <router-link to="/video-chat-other">视频会议（其它人）</router-link> |
    <router-link to="/whiteboard">共享白板</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
