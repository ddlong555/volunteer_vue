// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from '@/components/Home/Home'
import Listen from '@/components/listen/listen'
import find from '@/components/find/find'
import personal from '@/components/personal/personal'
import personal2 from '@/components/personal2/personal2'
import player from '@/components/player/player'
import login from '@/components/login/login'

import classify from '@/components/classify/classify'
import recommend from '@/components/recommend/recommend'
import member from '@/components/member/member'
import directSeeding from '@/components/directSeeding/directSeeding'
import Radio from '@/components/radio/radio'
import book_link from "./components/book_link/book_link";
import cartoon from "./components/cartoon/cartoon";
import psy_test from "./components/psy_test/psy_test";
import psy_test_start from "./components/psy_test_start/psy_test_start";
import result from "./components/result/result";
import ElementUI from 'element-ui'
import radio from "./components/radio/radio";
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/api/interface.js'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import Axios from "axios"

import store from'./store'  //引入store


Vue.prototype.$video = Video
Vue.prototype.$axios = Axios;


Vue.use(VueRouter);
Vue.use(ElementUI);
/* eslint-disable no-new */

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Home',
    component: Home,
    children: [
      {
        path: '/Home/classify',
        component: classify
      },
      {
        path: '/Home/radio',
        component: radio
      },
      {
        path: '/Home/personal2',
        component:personal2
      },
      {
        path: '/Home/psy_test',
        component:psy_test
      },
      {
        path: '/Home/psy_test_start',
        component:psy_test_start
      },
      {
        path: '/Home/login',
        component: login
      },
      {
        path: '/Home/book_link',
        component: book_link
      },
      {
        path: '/Home/cartoon',
        component:cartoon
      },
      {
        path: '/Home/recommend',
        component: recommend
      },
      {
        path: '/Home/member',
        component: member
      },
      {
        path: '/Home/directSeeding',
        component: directSeeding
      },
      {
        path: '/Home/result',
        component: result
      },
      {
        path: '/Home/radio',
        component: Radio
      }
    ]
  },
  {
    path: '/listen',
    component: Listen
  },
  {
    path: '/psy_test',
    component: psy_test
  },
  {
    path: '/radio',
    component: radio
  },
  {
    path: '/psy_test_start',
    component: psy_test_start
  },
  {
    path: '/login',
    component: login
  },

  {
    path: '/book_link',
    component: book_link
  },
  {
    path: '/cartoon',
    component: cartoon
  },
  {
    path: '/player',
    component: player
  },
  {
    path: '/find',
    component: find
  },
  {
    path: '/result',
    component: result
  },
  {
    path: '/personal2',
    component: personal2
  },
  {
    path: '/personal',
    component: personal
  }
]
const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes
})
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  data: {
    eventBus: new Vue()   //  event 统一处理事件、数据
  }
})

