import Vue from 'vue'
import Vuex from 'vuex'
import TodoProvider from '../resources/todo_provider'
const userService = new TodoProvider()

Vue.use(Vuex)

const modules = {
}

const state = {
  user: {},

}

const actions = {
  async getTodo ({commit}) {
    const data = await userService.getTodo()
    commit('GET_TODO', data)
  },

  async createTodo ({commit},request) {
    const data = await userService.createTodo(request)
    commit('CREATE_TODO', data)
  },

  async removeTodo ({commit},request) {
    const data = await userService.removeTodo(request)
    commit('REMOVE_TODO', data)
  }

}

const mutations = {
  GET_TODO (state, data) {
    console.log(data.body)
    state.user = data.body
  },

  CREATE_TODO(){

  },

  REMOVE_TODO(){}
}

export default new Vuex.Store({
  modules,
  state,
  actions,
  mutations
})