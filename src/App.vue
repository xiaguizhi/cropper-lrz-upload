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
    return {
      throttleFlag: false,
      throttleOptions: {
        last: null,
        duration: 5000, // 每5000ms必定执行一次
        delay: 300, // 300ms内不重复调用
        timer: null
      },
      debounceFlag: true,
      debounceOptions: {
        delay: 300,
        timer: null
      }
    };
  },
  methods: {
    throttle() {
      let current = new Date();
      clearTimeout(this.throttleOptions.timer);
      this.throttleOptions.timer = null;
      this.throttleOptions.timer = setTimeout(() => {
        this.toDo();
        this.throttleOptions.last = current;
      }, this.throttleOptions.delay);
      if (
        current - this.throttleOptions.last >= this.throttleOptions.duration &&
        this.throttleOptions.last
      ) {
        this.toDo();
        this.throttleOptions.last = current;
      }
    },
    toDo() {
      if (this.throttleFlag) {
        console.log("节流,滚动每五秒可触发一次");
      }
      if (this.debounceFlag) {
        console.log("防抖,操作结束执行一次");
      }
    },
    debounce() {
      if (this.debounceOptions.timer) {
        clearTimeout(this.debounceOptions.timer);
        this.debounceOptions.timer = null;
      }
      this.debounceOptions.timer = setTimeout(() => {
        this.toDo();
      }, this.throttleOptions.delay);
    }
  },
  mounted() {
    if (this.throttleFlag) {
      window.addEventListener("scroll", this.throttle);
    }
    if (this.debounceFlag) {
      window.addEventListener("scroll", this.debounce);
    }
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
  height: 200vh;
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
