import React from 'react'
import '../stylesheets/MatchProfile.css'

const MatchProfile = (props) => {
  console.log(props)
  if(props.match.length == 0){
    return(
      <div>
        <img src='/Could_be_you.jpg'/>
        <h1>this could be you but you playin</h1>
      </div>
    )
  } else {
  return(
    <div className="profile">
      <h1>{props.match.username}</h1>
      <img src='/black_profile.png' alt={props.match.username} className="profile-pic"/>
      <h4>Age: {props.match.age}</h4>
      <h4>Sex: {props.match.sex}</h4>
      <h4>Location: {props.match.location}</h4>
      <div id='bio-div'>
        <h4>Bio: {props.match.bio}</h4>
      </div>
      <button>Message</button>
      {/* <h4>{props.match.sex}</h4>
      <h4>{props.match.location}</h4>
      <h4>{props.match.bio}</h4>
      <p>{props.match.dogs ? 'Likes: Dogs' : 'Does Not Like: Dogs'}</p> */}
    </div>
    )
  }
}
export default MatchProfile;
