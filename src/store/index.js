import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { // 要设置的全局访问的state对象
  breadcumb: [] // 面包屑导航
}

const getters = { // 实时监听state值的变化(最新状态)
  // 
}

const mutations = { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
  handleBreadcumb: function (state, route) {
    if (!state.breadcumb.includes(route)) {
      state.breadcumb.push(route)
    } else {
      state.breadcumb.splice(state.breadcumb.indexOf(route) + 1)
    }
  },
  clearBreadcumb: function (state) {
    state.breadcumb = []
  }
}

const actions = { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
  // 
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store