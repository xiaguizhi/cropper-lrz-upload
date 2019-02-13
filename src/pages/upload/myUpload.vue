<template>
  <div>
    <upload-files @getresult="upload" :imgList="imgList"></upload-files>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
export default {
  components: { uploadFiles },
  data() {
    return {
      imgList: []
    };
  },
  methods: {
    upload(e) {
      this.imgList.push(e);
    }
  }
};
</script>

<style>
</style>
