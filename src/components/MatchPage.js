import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMatch } from '../actions/userActions'
import '../stylesheets/MatchPage.css'
// import Swipeable from "react-swipy"
// import Webcam from './Webcam'


// p.on('signal', function(data){ console.log('SDP DATA:', JSON.stringify(data))})
// p.on('signal', fetch('localhost:3001/connect').then(r => r.json()).then(console.log)).catch(err => console.log)

class MatchPage extends Component {

  state = {
    clicked: false
  }

  componentDidMount(){
    this.props.loadMatch()
  }

handleClick = (e) => {
  let response;
    e.target.name === "yes" ? response = 1 : response = 0
  // if(this.props.match.user.isFollowed){
  //   the follower needs to post to the first_answer with their answer
    let token = localStorage.getItem('token')
    debugger
    fetch(`http://localhost:3000/relationships`,{
      method: 'PATCH',
      headers: {
             "Content-Type": "application/json; charset=utf-8",
             "Authorization": "Token " + token
         },
      body: JSON.stringify({relationship: {current_user_id: this.props.current_user.id,
              match_id:this.props.match.user.id,
              response:response
    }
  })
}).then(res => this.props.loadMatch())
}

render(){
  console.log(this.props)
     if(!isEmpty(this.props.match.user) && this.props.match !== 'no user found'){
      return(
        <div id='match-div'>
          <img src='/black_profile.png' alt={this.props.match.id}/>
          <h1>{this.props.match.user.username}</h1>
          <h2>Age: {this.props.match.user.age}</h2>
          <h2>Gender: {this.props.match.user.sex}</h2>
          <h2>Location: {this.props.match.user.location}</h2>
          {/* <h1>ID: {this.props.match.user.id}</h1> */}
            {/* <button onClick={() => this.props.loadMatch()}>Find Matches</button> */}
            <button name="yes" onClick={(e) => this.handleClick(e)}>HI</button>
            <button name="no" onClick={(e) => this.handleClick(e)}>BYE</button>
        </div>
        )
      } else if(isEmpty(this.props.match)){
        return (
          <div>
            <h1>Click Button To Find a Match!</h1><br/>
            <button onClick={() => this.props.loadMatch()}>Find Matches</button>
          </div>
          )
        } else if(this.props.match === 'no user found'){
          return(<div>
            <h1>No Users Found</h1><br/>
            <button onClick={() => this.props.loadMatch()}>Find Matches</button>
            <p>Try again later</p>
            </div>
          )
        }
      else {
          return(
            <div className="loading">
            <h1>Loading...</h1>

            <button onClick={() => this.props.loadMatch()}>Find Matches</button>
            </div>
          )

      }
    }
  }

// p.on('signal', function(data){
//     console.log('signal data', JSON.stringify(data))
// })
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const mapStateToProps = state => {
      return {
        match: state.current_match,
        current_user: state.user_info

    }
}
const mapDispatchToProps = dispatch => {
  return {
    loadMatch: () => dispatch(loadMatch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchPage);
