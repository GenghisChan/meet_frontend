import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import '../stylesheets/SignUp.css'
// import profileimg from '../public/black_profile.png'

class SignUp extends Component {

  state={
    error: false,
    error_messages: [],
    username: "",
    password: "",
    age: "",
    sex: "",
    location: "",
    bio: "",
    online: true,
    dogs: true
  }

  signUp = () => {
    fetch("http://localhost:3000/sign_up",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "user": {"username": this.state.username,
                "password": this.state.password,
                  "age": this.state.age,
                  "sex": this.state.sex,
                  "location": "NYC",
                  "bio": this.state.bio,
                  "dogs": true,
                  "online": true,
                  "img_url": 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        }
      })
    })
    .then(res => res.json())
    .then(resp => {
      if (resp.error){
        this.setState({error: true, error_messages: resp.error})
      }
      else{
        console.log('this is the resp', resp)
        this.props.current_user(resp)
        this.props.login(this.state.username, this.state.password)
        this.props.history.push('/profile')
      }
    })
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    // console.log(`${e.target.name}: ${e.target.value}`)
    // console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.signUp()
  }

  render(){
    // if (this.state.error){
    //
    //   alert("Information missing");
    //   return null
    // }else{
      return(
        <div className="signup">
          {this.state.error && this.state.error_messages.map(error => <li style={{color:"red"}}>{error}</li>)}
          <div id="signup-images">
            <img src='/dog.jpg' alt='happy couple'/>
          </div>
          <div id="signup-form-div">
          <h1>Sign Up and Start meeting people</h1>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <div className='equal width fields' id="signup-form">
                <div className='field'>
                <label>Username</label>
                <div className='ui input'>
                <input type='text' placeholder='Username' name="username" onChange={this.handleChange}/>
                </div>
              </div>
                <div className='field'>
                <label>Password</label>
                <div className='ui input'>
                <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
              </div>
            </div>
                <div className='field'>
                <label>Age</label>
                <div className='ui input'>
                <input type="age" placeholder='age' name="age" onChange={this.handleChange}/>
              </div>
            </div>
            {/* <div id="details"> */}
                {/* <label>Sex</label>
                <input type="sex" placeholder='Sex' name="sex" onChange={this.handleChange}/> */}
                {/* <label>Location</label>
                <input type="location" placeholder='Location' name="location" onChange={this.handleChange}/>
                <label>Bio</label>
                <input type="bio" placeholder='Bio' name="bio" onChange={this.handleChange}/> */}
              <button type='submit'>Sign Up</button>
            {/* </div> */}
            </div>
            </form>
          </div>
      </div>
      )
    }
  }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    current_user: (resp) => dispatch({type: 'CURRENT_USER', payload: resp}),
    login: (username, password) => dispatch(login(username, password))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignUp))
