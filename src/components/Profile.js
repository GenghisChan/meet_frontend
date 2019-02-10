import React from 'react'
import { connect } from 'react-redux'
import '../stylesheets/Profile.css'

const Profile = (props) => {
  return(
    <div id="profile-div">
      <div>

      <img src='/black_profile.png' alt={props.user.user_info.username}/>
      <h1>{props.user.user_info.username}</h1>
      <h4>Age: {props.user.user_info.age}</h4>
      <h4>Location: {props.user.user_info.location}</h4>
      <div id="bio-div">
        <h4>{props.user.user_info.bio}</h4>
      </div>
      <h4>{props.user.user_info.dogs ? 'Likes: Dogs' : 'Does Not Like: Dogs'}</h4>
    </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    user: state
  }
}
export default connect(mapStateToProps)(Profile);
