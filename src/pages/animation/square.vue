<template>
  <div class="page">
    <ul class="square">
      <li v-for="(item,index) in square" :key="index">
        <img :src="item.src" alt>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      square: [
        {
          src: require("../../assets/images/1.jpg")
        },
        {
          src: require("../../assets/images/2.jpg")
        },
        {
          src: require("../../assets/images/3.jpg")
        },
        {
          src: require("../../assets/images/4.jpg")
        },
        {
          src: require("../../assets/images/5.jpg")
        },
        {
          src: require("../../assets/images/6.jpg")
        }
      ]
    };
  }
};
</script>

<style>
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.page {
  padding-top: 150px;
  width: 100px;
  height: 100px;
}
.square {
  position: relative;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d; /* Safari 和 Chrome */
  animation: square 2s infinite;
  /* Firefox: */
  -moz-animation: square 2s infinite;
  /* Safari 和 Chrome: */
  -webkit-animation: square 2s infinite;
  /* Opera: */
  -o-animation: square 2s infinite;
}
/* 前 */
.square:hover li:nth-of-type(1) {
  transform: translateZ(100px);
  -webkit-transform: translateZ(100px);
  -moz-transform: translateZ(100px);
}
/* 右 */
.square:hover li:nth-of-type(2) {
  transform: rotateY(90deg) translateZ(100px);
  -webkit-transform: rotateY(90deg) translateZ(100px);
  -moz-transform: rotateY(90deg) translateZ(100px);
}
/* 后 */
.square:hover li:nth-of-type(3) {
  transform: translateZ(-100px);
  -webkit-transform: translateZ(-100px);
  -moz-transform: translateZ(-100px);
}
/* 左 */
.square:hover li:nth-of-type(4) {
  transform: rotateY(-90deg) translateZ(100px);
  -webkit-transform: rotateY(-90deg) translateZ(100px);
  -moz-transform: rotateY(-90deg) translateZ(100px);
}
/* 上 */
.square:hover li:nth-of-type(5) {
  transform: rotateX(-90deg) translateZ(100px);
  -webkit-transform: rotateX(-90deg) translateZ(100px);
  -moz-transform: rotateX(-90deg) translateZ(100px);
}
/* 下 */
.square:hover li:nth-of-type(6) {
  transform: rotateX(90deg) translateZ(100px);
  -webkit-transform: rotateX(90deg) translateZ(100px);
  -moz-transform: rotateX(90deg) translateZ(100px);
}
.square li {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
}
/* 前 */
.square li:nth-of-type(1) {
  transform: translateZ(50px);
  -webkit-transform: translateZ(50px);
  -moz-transform: translateZ(50px);
}
/* 右 */
.square li:nth-of-type(2) {
  transform: rotateY(90deg) translateZ(50px);
  -webkit-transform: rotateY(90deg) translateZ(50px);
  -moz-transform: rotateY(90deg) translateZ(50px);
}
/* 后 */
.square li:nth-of-type(3) {
  transform: translateZ(-50px);
  -webkit-transform: translateZ(-50px);
  -moz-transform: translateZ(-50px);
}
/* 左 */
.square li:nth-of-type(4) {
  transform: rotateY(-90deg) translateZ(50px);
  -webkit-transform: rotateY(-90deg) translateZ(50px);
  -moz-transform: rotateY(-90deg) translateZ(50px);
}
/* 上 */
.square li:nth-of-type(5) {
  transform: rotateX(-90deg) translateZ(50px);
  -webkit-transform: rotateX(-90deg) translateZ(50px);
  -moz-transform: rotateX(-90deg) translateZ(50px);
}
/* 下 */
.square li:nth-of-type(6) {
  transform: rotateX(90deg) translateZ(50px);
  -webkit-transform: rotateX(90deg) translateZ(50px);
  -moz-transform: rotateX(90deg) translateZ(50px);
}
.square img {
  width: 100%;
  height: 100%;
  display: block;
}
@keyframes square {
  from {
  }
  to {
    transform: rotateX(360deg) rotateY(-360deg);
    -webkit-transform: rotateX(360deg) rotateY(-360deg);
    -moz-transform: rotateX(360deg) rotateY(-360deg);
  }
}

@-moz-keyframes square /* Firefox */ {
  from {
  }
  to {
    transform: rotateX(360deg) rotateY(-360deg);
    -webkit-transform: rotateX(360deg) rotateY(-360deg);
    -moz-transform: rotateX(360deg) rotateY(-360deg);
  }
}

@-webkit-keyframes square /* Safari 和 Chrome */ {
  from {
  }
  to {
    transform: rotateX(360deg) rotateY(-360deg);
    -webkit-transform: rotateX(360deg) rotateY(-360deg);
    -moz-transform: rotateX(360deg) rotateY(-360deg);
  }
}

@-o-keyframes square /* Opera */ {
  from {
  }
  to {
    transform: rotateX(360deg) rotateY(-360deg);
    -webkit-transform: rotateX(360deg) rotateY(-360deg);
    -moz-transform: rotateX(360deg) rotateY(-360deg);
  }
}
</style>
