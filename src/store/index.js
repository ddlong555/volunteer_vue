import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import * as types from './types'

const store = new Vuex.Store({
  state: {
    user: '',
    question_list: [{QS_content:"测试题目1",answer:[{answer_content:"答案一",points:5},{answer_content:"答案二",points:4},{answer_content:"答案三",points:3}]},
        {QS_content:"测试题目2",answer:[{answer_content:"答案一",points:5},{answer_content:"答案二",points:4},{answer_content:"答案三",points:3}]},
        {QS_content:"测试题目3",answer:[{answer_content:"答案一",points:5},{answer_content:"答案二",points:4},{answer_content:"答案三",points:3}]}],


  },
  getters: {
    getUser(state){
      return state.user;
    }
  },
  mutations: {
    [types.SET_USER](state, value) {
      state.user = value
    },
    [types.SET_SELECT](state, value) {
      state.options = value
    }
  },
  actions: {
    setUser({ commit }, value){
      setTimeout(()=>{
        commit(types.SET_USER, value)
      },2000)
    },
    setSelect({ commit }, value) {
      return new Promise((resolve, reject)=>{
        api.$http('/news/select', '')
          .then(res => {
            commit(types.SET_SELECT, res.data);
            resolve();
          }).catch(error => {
          reject();
        })
      })
    }
  }
})

export default store;
