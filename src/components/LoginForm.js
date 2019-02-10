import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
import '../stylesheets/LoginForm.css'

class LoginForm extends Component {
  state={
    error: false,
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
    this.props.history.push('/profile')
  }

  render(){
      return(
        <div id="login-form">
        <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input placeholder='Username' name="username" onChange={this.handleChange}/>
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));









// fetch("http://localhost:3000/login",{
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     username,
//     password
//   })
// })
// .then(res => res.json())
// .then(resp => {
//   if (resp.error){
//     this.setState({error: true})
//   }
//   else{
//     console.log('this is the resp', resp)
//     this.props.login(resp)
//   }
// })
