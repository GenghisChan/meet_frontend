import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import MatchPage from './components/MatchPage'
import SignUp from './components/SignUp'
import MatchContainer from './components/MatchContainer'
import ConversationsList from './components/ConversationsList'


class App extends Component {



  constructor(){
    super()
    this.state={
      auth: {currentUser: {}}
    }
  }

componentDidMount() {
  const token = localStorage.getItem("token");
  // console.log('token', token) //if there is a token
  if (token && !!this.props.currentUser) {
    fetch("http://localhost:3000/current_user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Token ' + token
      }
    })
      .then(resp => resp.json())
      .then(user => this.props.current_user(user["username"]));
    }
}


  render() {
    return(
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/match' component={MatchPage}/>
            <Route exact path='/matches' component={MatchContainer}/>
            <Route exact path='/convo' component={ConversationsList}/>
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/' component={SignUp}/>
          </Switch>
        </div>
      </Router>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user_info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    current_user: (resp) => dispatch({type: 'CURRENT_USER', payload: resp})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
