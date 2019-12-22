import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './components/Home'
import Apogee from './components/Apogee'
import Performance from './components/Performance'
import Drag from './components/Drag'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/apogee-determination', component: Apogee },
  { path: '/performance-prediction', component: Performance },
  { path: '/drag-prediction', component: Drag },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
