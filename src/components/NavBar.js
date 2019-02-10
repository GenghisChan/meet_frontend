import React from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { loadMatch } from '../actions/userActions'
import '../stylesheets/NavBar.css'

const loggedIn = (props) => {
  if(!localStorage.token) {
    return (
      <div className="login-signup-div">
        <span><Link to="/login">Login</Link></span>
        <span><Link to="/">Sign Up</Link></span>
      </div>
    )
  } else {
    return (
      <div className="login-signup-div">
        <span><Link to="/match">Find Matches</Link></span>
        <span><Link to="/matches">Matches</Link></span>
        <span><Link to="/profile">Profile</Link></span>
        {/* <span><Link to="/convo">Test Conversations</Link></span> */}
        <span onClick={props.logOut}><Link to="/">Sign Out</Link></span>
      </div>
    )
  }
}

const NavBar = (props) => {
  return(
    <div id="navbar">
      <h1 class="logo">DOGGOS</h1>
      {loggedIn(props)}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    online: state.user_info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch({type:'LOG_OUT'}),
    loadMatch: () => dispatch(loadMatch())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
