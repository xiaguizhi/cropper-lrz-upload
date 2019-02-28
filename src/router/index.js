import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      component: resolve => require(['../pages/upload/upload.vue'], resolve), // 上传图片
    },
    {
      path: "/myUpload",
      component: resolve => require(['../pages/upload/myUpload.vue'], resolve), // 上传图片组件
    },
    {
      path: "/square",
      component: resolve => require(['../pages/animation/square.vue'], resolve), // 动画组件
    }
  ]
})
