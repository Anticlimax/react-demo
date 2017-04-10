import React, { Component } from 'react'

export default class TodoInput extends Component {
  constructor(){
    return <input type="text" value={this.props.content}/>
  }
}