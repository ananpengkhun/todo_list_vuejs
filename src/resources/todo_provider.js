
import HttpRequest from './http_request'

class TodoProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://localhost:3000')
  }

  async getTodo () {
    const {data} = await this.get('/todo')
    return data
  }

  async createTodo (request) {
    const {data} = await this.create('/todo',request)
    return data
  }

  async updateTodo(request){
    const {data} = await this.update('/todo',request)
    return data

  }

  async removeTodo (request) {
    const {data} = await this.delete('/todo',null,request)
    return data
  }



}

export default TodoProvider