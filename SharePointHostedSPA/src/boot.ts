import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  { path: '/SharePointHostedSPA/foo', component: require('./components/component1/component1.vue.html'), name: 'Foo' },
  { path: '/SharePointHostedSPA/bar', component: require('./components/component2/component2.vue.html'), name: 'Bar' },

];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  el: '#contentBody',
  router: router,
  render: h => h(require('./components/app/app.vue.html'))
});
