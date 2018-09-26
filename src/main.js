import Vue from 'vue'
import App from './App'
import router from './router'
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import show from './show';
import 'normalize.css';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
})

Vue.component('van-show', show);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
