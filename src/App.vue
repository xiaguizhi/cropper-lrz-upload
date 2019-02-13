<template>
  <div id="app">
    <div class="tab_list">
      <div>
        <router-link to="/" class="tab">移动端上传文件</router-link>
      </div>
      <div>
        <router-link to="/myUpload" class="tab">上传文件组件</router-link>
      </div>
      <div>
        <router-link to="/square" class="tab">动画</router-link>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "./assets/plugins/cropper/css/cropper.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}

.tab_list {
  width: 20%;
}

.tab {
  text-decoration: none;
  background-color: #bfefff;
  color: #fff;
  display: inline-block;
  width: 50%;
  height: 30px;
  line-height: 30px;
  padding: 10px;
  text-align: center;
  margin: 10px;
  border-radius: 5px;
}

.tab:hover {
  background-color: #eed8ae;
}

.view {
  width: 80%;
  padding: 10px;
}
</style>
