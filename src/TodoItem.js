import React, { Component } from 'react'

export default class TodoInput extends Component {
  render(){
    return ( 
    <div className="TodoItem">
      <input type="checkbox" checked={this.props.todo.status==="completed"}
                             onChange={this.toggle}/>
      <span>{this.props.todo.title}</span>
      <button onClick={this.delete} >删除</button>
    </div>
    ) 
  }
  toggle=(e)=>{
    this.props.onToggle(e,this.props.todo)
  }
  delete=(e)=>{
    this.props.onDelete(e,this.props.todo)
  }
}