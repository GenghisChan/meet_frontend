import React, { Component } from 'react'
import '../stylesheets/Match.css'

class Match extends Component {

  render(){
    console.log(this.props.match)
    return(
      <div className="matches" onClick={() => this.props.selectUser(this.props.match.user)}>
        <div className="img-container">
          <img src='/black_profile.png'/>
          <h4>{this.props.match.user.username}</h4>
        </div>
      </div>
    )
  }
}

export default Match;
