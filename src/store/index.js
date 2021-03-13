import Vue from 'vue'
import Vuex from 'vuex'
import TodoProvider from '../resources/todo_provider'
const todoService = new TodoProvider()

Vue.use(Vuex)

const modules = {
}

const state = {
  user: [],
  fullTodo: [],
  currentFilter:99,
  rows:[
    { "id": "4", "edit": true }, 
    { "id": "5"},
    { "id": "6"},
    { "id": "7"},
    { "id": "8"},
    { "id": "9"},
    { "id": "10"},
  ],
}

const actions = {
  async getTodo({ commit }) {
    const data = await todoService.getTodo()
    commit('GET_TODO', data)
  },

  async createTodo({ commit ,dispatch}, request) {
    const data = await todoService.createTodo(request)
    dispatch('getTodo')
    commit('CREATE_TODO', data)
  },

  async updateTodo({commit},request){
    console.log(request)
    const data = await todoService.updateTodo(request)
  
    commit('UPDATE_TODO',data)
  },

  async removeTodo({ commit ,dispatch }, request) {
    const data = await todoService.removeTodo(request)
    dispatch('getTodo')
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

    if (state.currentFilter == 99) return
    var filter = state.user.filter(item => {
      if (item.status == state.currentFilter) return item
    });
    state.user = filter
  },

  CREATE_TODO() {

  },

  UPDATE_TODO(state,data){
    console.log(data)
    let i = state.user.findIndex(r =>r.id == data.body.id)
    let iFull = state.fullTodo.findIndex(r => r.id == data.body.id)
    
    state.user[i].name = data.body.name
    state.user[i].todo = data.body.todo
    state.user[i].status = data.body.status

    state.fullTodo[iFull].name = data.body.name
    state.fullTodo[iFull].todo = data.body.todo
    state.fullTodo[iFull].status = data.body.status


    if (state.currentFilter == 99) return
    var filter = state.user.filter(item => {
      if (item.status == state.currentFilter) return item
    });
    state.user = filter


  },

  REMOVE_TODO() { },

  FILTTER_TODO(state, status) {
    state.currentFilter = status
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