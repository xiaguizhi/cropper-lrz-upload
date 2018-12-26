<template>
  <div id="app">
    <div class="content" ref="content">
      <!-- 上传 -->
      <input
        class="upload"
        type="file"
        ref="upload"
        name="upload"
        accept="image/*"
        @change="upload"
      >
      <!-- 上传的按钮 -->
      <button @click="uploadClick">上传图片</button>
      <!-- 图片预览 -->
      <img :src="imgUrl " alt ref="image">
    </div>
    <!-- 裁剪 -->
    <div class="v-cropper-layer cropper-box" ref="layer" style="display:none;">
      <div class="layer-header cropper-position">
        <button class="cancel" @click="cancelHandle">取消</button>
        <button class="confirm" @click="confirmHandle">裁剪</button>
      </div>
      <img ref="cropperImg">
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs"; // 裁剪插件，需要通过npm安装下
import lrz from "lrz"; // 压缩库，需要通过npm安装下
export default {
  data() {
    return {
      imgUrl: "",
      cropper: {},
      isApi: false // 有无可用的上传图片的接口，false：没有上传的接口，只作预览用，模拟上传
    };
  },
  methods: {
    dataURLtoFile(dataurl, filename) {
      // 将base64转换为文件
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    random_string(len) {
      // 随机生成文件名
      len = len || 32;
      let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      let maxPos = chars.length;
      let pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    upload(e) {
      // 上传事件，当input选取图片或更改图片时触发
      let file = e.target.files[0];
      let URL = window.URL || window.webkitURL;
      this.$refs["layer"].style.display = "block";
      this.$refs["content"].style.display = "none";
      this.cropper.replace(URL.createObjectURL(file));
    },
    uploadClick() {
      // 触发upload方法
      this.$refs.upload.click();
    },
    cropperInit() {
      // 初始化裁剪插件
      let cropperImg = this.$refs["cropperImg"];
      this.cropper = new Cropper(cropperImg, {
        viewMode: 1, // 裁剪配置，具体见https://blog.csdn.net/weixin_38023551/article/details/78792400
        dragMode: "move"
      });
    },
    cancelHandle() {
      // 取消上传
      this.cropper.reset();
      this.$refs["layer"].style.display = "none";
      this.$refs["content"].style.display = "block";
      this.$refs["upload"].value = "";
    },
    confirmHandle() {
      let cropBox = this.cropper.getCropBoxData();
      let scale = 1;
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width * scale,
        height: cropBox.height * scale
      });
      let imgData = cropCanvas.toDataURL("image/jpeg");
      // 裁剪完成，开始上传，这里上传用formData格式，具体方式视后台接口
      let formdata = new FormData();
      lrz(imgData, {
        width: 600 // lrz为压缩方法，此处设置压缩参数，单位px
      }).then(rst => {
        // 压缩后返回的图片为base64格式，用rst.base64获取
        if (!this.isApi) {
          // 注意因为无可用的上传图片接口，在此处打断了模拟效果！！！
          setTimeout(() => {
            this.cancelHandle();
            this.imgUrl = rst.base64;
            alert("上传图片时请去掉此处模拟的代码");
          }, 500);
          return;
        }
        formdata.append(
          "files", // 此处配置传给后台的参数名
          this.dataURLtoFile(rst.base64, this.random_string()) // 将base64转成名字随机的文件
        );
        uploadApi(formdata)
          .then(res => {
            // 调接口时，上传的headers一定要配置正确
            this.cancelHandle();
            this.imgUrl = res.results;
            // 到此上传预览成功，以下为上传头像时的配置代码
            let imgShow = this.$refs.image[0]; // 获取图片元素设置动态属性，此处处理在图片长宽不确定但父元素长宽固定时（如头像），始终全部展现
            // 创建实例对象获取图片真实宽高
            let newImg = new Image();
            newImg.src = this.imgUrl;
            // 等待图片加载完成获取宽高
            newImg.onload = () => {
              // 宽高适配
              if (newImg.width >= newImg.height) {
                imgShow.style["max-width"] = "";
                imgShow.style["min-height"] = "";
                imgShow.style["min-width"] = "0.6rem";
                imgShow.style["max-height"] = "0.6rem";
              } else {
                imgShow.style["min-width"] = "";
                imgShow.style["max-height"] = "";
                imgShow.style["max-width"] = "0.6rem";
                imgShow.style["min-height"] = "0.6rem";
              }
            };
            console.log("上传成功");
          })
          .catch(err => {
            this.cancelHandle();
            console.log("上传失败");
          });
      });
    }
  },
  mounted() {
    this.cropperInit(); // 裁剪初始化
  }
};
</script>

<style scoped>
.upload {
  display: none;
}
.cropper-box {
  width: 50%;
  height: 100vh;
  margin: 0 auto;
}
.cropper-box .cropper-position {
  position: fixed;
  bottom: 0;
  width: 50%;
  height: 60px;
  text-align: center;
  padding: 0.1rem 0;
  z-index: 999;
  background-color: #fff;
}
.cropper-position button {
  width: 100px;
  height: 50px;
  border-radius: 3px;
  border: none;
}
.cropper-position button:nth-of-type(2) {
  background-color: #eb4242;
  color: #fff;
  border: none;
}
</style>
