import React, {Component} from 'react'

import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import copyState from './copyState'
import { getCurrentUser, signOut } from './leanCloud'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user:getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
  }

  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li key={item.id}>
            <TodoItem todo={item} onToggle={this.toggle}
                      onDelete={this.delete}/>
          </li>
        )
      })

    return (
      <div className="App">
        <h1>{ this.state.user.username || '我'}的待办
            { this.state.user.id? <button onClick={ this.userSignOut }>登出</button> : null}</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
                     onSubmit={this.addTodo}
                     onChange={this.changeTitle}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        { this.state.user.id ?
          null :
          <UserDialog
            onSignUp={this.onSignUpOrSignIn}
            onSignIn={this.onSignUpOrSignIn} /> }
      </div>
    )
  }

  componentDidUpdate(){

  }

  addTodo = (event) => {
    if (event.target.value) {
      this.state.todoList.push({
        id: idMaker(),
        title: event.target.value,
        status: null,
        deleted: false
      })
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }
    console.log(1)
  }
  changeTitle = (event) => {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  toggle = (e, todo) => {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  delete = (event, todo) => {
    todo.deleted = true
    this.setState(this.state)
  }

  onSignUpOrSignIn = (user)=>{
    let stateCopy = copyState(this.state)
    stateCopy.user = user
    this.setState(stateCopy)
  }
  userSignOut = ()=>{
    signOut()
    let stateCopy = copyState(this.state)
    stateCopy.user = {}
    this.setState(stateCopy)
  }

}

export default App

let id = 0
function idMaker() {
  id += 1
  return id
}