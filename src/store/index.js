import Vue from 'vue'
import Vuex from 'vuex'
import TodoProvider from '../resources/todo_provider'
const userService = new TodoProvider()

Vue.use(Vuex)

const modules = {
}

const state = {
  user: [],
  fullTodo: []
}

const actions = {
  async getTodo({ commit }) {
    const data = await userService.getTodo()
    commit('GET_TODO', data)
  },

  async createTodo({ commit }, request) {
    const data = await userService.createTodo(request)
    commit('CREATE_TODO', data)
  },

  async removeTodo({ commit }, request) {
    const data = await userService.removeTodo(request)
    commit('REMOVE_TODO', data)
  },

  async filterTodo({ commit }, status) {

    commit('FILTTER_TODO', status)
  }

}

const mutations = {
  GET_TODO(state, data) {
    console.log(data.body)
    state.user = data.body
    state.fullTodo = data.body
  },

  CREATE_TODO() {

  },

  REMOVE_TODO() { },

  FILTTER_TODO(state, status) {
    state.user = state.fullTodo
    if (status == 99) return
    var filter = state.user.filter(item => {
      if (item.status == status) return item
    });
    state.user = filter
  }
}

export default new Vuex.Store({
  modules,
  state,
  actions,
  mutations
})