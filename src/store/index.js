import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const $http = axios;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:null,
  },
  mutations: {
    SET_DATA(state,payload){
      Vue.set(state,'payload',payload);
    }
  },
  actions: {
    fetchData(){
      return new Promise((resolve,reject)=>{
        $http.get('http://www.mocky.io/v2/5e8465c23000008400cf4395').then((res)=>{
          this.commit('SET_DATA',res.data);
          resolve(res.data);
        });
      })
    }
  },
  modules: {
  }
})
