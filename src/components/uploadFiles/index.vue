<template>
  <div class="upload">
    <div
      :class="'container '+(imgList[0]?'container_trash_can':'container_camera')"
      @click="uploadOptions"
    >
      <input
        type="file"
        accept="image/*"
        :multiple="multiple"
        class="upload_input"
        ref="upload"
        @change="upload"
      >
      <img :src="imgList[0]" alt class="upload_img" v-if="imgList[0]">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 组件属性
    formDataKey: {
      // 上传字段名
      type: String,
      default: () => {
        return "file";
      }
    },
    multiple: {
      // 是否支持多选
      type: Boolean,
      default: () => {
        return false;
      }
    },
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    limit: {
      // 最大允许上传个数
      type: Number,
      default: () => {
        return 1;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    uploadOptions() {
      if (this.imgList[0]) {
        this.imgList.splice(0, 1);
        this.$refs.upload.value = "";
        return;
      }
      this.$refs.upload.click();
    },
    upload(e) {
      let file = e.target.files[0];
      let renameFile = new File([file], this.randomString() + file.name, {
        type: file.type
      });
      let formData = new FormData();
      formData.append(this.formDataKey, renameFile);
      setTimeout(() => {
        // 模拟上传
        this.imgToBase64(renameFile).then(rst => {
          this.$emit("getresult", rst);
        });
      }, 500);
    },
    randomString(len) {
      // 随机字符串
      len = len || 8;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    imgToBase64(file) {
      // 图片文件转base64
      let reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve, reject) => {
        reader.onload = e => {
          resolve(e.target.result);
        };
      });
    }
  }
};
</script>

<style scoped>
.upload {
  width: 200px;
  height: 200px;
  background-color: #bfefff;
  border-radius: 5px;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}
.container:hover {
  background-color: #eed8ae;
}
.container:before {
  content: "";
  width: 25%;
  height: 25%;
  display: inline-block;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.container_camera:before {
  background-image: url("../../assets/images/camera.png");
}
.container_trash_can:hover:before {
  background-image: url("../../assets/images/trashCan.png");
}
.upload_input {
  display: none;
}
.upload_img {
  width: 100%;
  height: 100%;
}
</style>
