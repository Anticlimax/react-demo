import React, {Component} from 'react'

import { signUp, signIn } from './leanCloud'
import './UserDialog.css'
import copyState from './copyState'



export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'signUp',
      formData: {
        username: '',
        password: ''
      }
    }
  }

    switchBtn = (e) => {
      this.setState({
        selected: e.target.value
      })
    }

    changeUserData (key, e) {
      let stateCopy = copyState(this.state)
      stateCopy.formData[key] = e.target.value
      this.setState(stateCopy)
    }

    formSignUp = (e) => {
      e.preventDefault()
      let {username, password} = this.state.formData
      let success = (user) => {
        this.props.onSignUp.call(null, user)
      }
      let error = (error) => {
        alert(error)
      }
      signUp(username, password, success, error)
    }

    formSignIn = (e) => {
      e.preventDefault()
      let { username, password} = this.state.formData
      let success = (user) =>{
        this.props.onSignIn.call(null, user)
      }
      let error = (user) =>{
        alert(error)
      }
      signIn(username,password,success,error)
    }


    render()
    {

      let signUpForm = (
        <form className="signUp" onSubmit={this.formSignUp}>
          <div className="row">
            <label>用户名</label>
            <input type="text" onChange={this.changeUserData.bind(this,'username')}
                   value={this.state.formData.username}/>
          </div>
          <div className="row">
            <label>密码</label>
            <input type="password" onChange={this.changeUserData.bind(this,'password')}
                   value={this.state.formData.password}/>
          </div>
          <div className="row actions">
            <button type="submit">注册</button>
          </div>
        </form>
      )

      let signInForm = (
        <form className="signIn" onSubmit={this.formSignIn}>
          <div className="row">
            <label>用户名</label>
            <input type="text" onChange={this.changeUserData.bind(this,'username')}
                   value={this.state.formData.username}/>
          </div>
          <div className="row">
            <label>密码</label>
            <input type="password" onChange={this.changeUserData.bind(this,'password')}
                   value={this.state.formData.password}/>
          </div>
          <div className="row actions">
            <button type="submit">登陆</button>
          </div>
        </form>
      )

      return (
        <div className="UserDialog-Wrapper">
          <div className="UserDialog">
            <nav>
              <label>
                <input type="radio" value="signUp"
                       checked={this.state.selected === "signUp"}
                       onChange={this.switchBtn}/>注册
              </label>
              <label>
                <input type="radio" value="signIn"
                       checked={this.state.selected === "signIn"}
                       onChange={this.switchBtn}/>登陆
              </label>
            </nav>
            <div className="panel">
              { this.state.selected === 'signUp' ? signUpForm : null }
              { this.state.selected === 'signIn' ? signInForm : null }
            </div>
          </div>
        </div>
      )

  }
}