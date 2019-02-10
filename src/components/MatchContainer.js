import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from './Match'
import { showMatches } from '../actions/userActions'
import MatchProfile from './MatchProfile'

class MatchContainer extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
   this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
   // references are now sync'd and can be accessed.
   this.subtitle.style.color = '#f00';
 }

 closeModal() {
   this.setState({modalIsOpen: false});
 }

componentDidMount(){
  this.props.showMatches()
}

  render(){
    console.log(this.props.info, "inside MatchContainer")
    // console.log(matches)
      if(this.props.info.matches.length > 0){
      const matches = this.props.info.matches.map(match => <Match key={match.user.id} user={match.user} selectUser={this.props.select_user} match={match}/>)
      return(
        <div>
          {matches}
          {this.props.info.selected_user.username ? (
            <div>
              <MatchProfile match={this.props.info.selected_user}/>
            </div> ) : null
          }
        </div>
    )

  } else {
    return (
      <div>
        No matches yet!
      </div>
    )
  }
}
}

const mapDispatchToProps = (dispatch) => {
  return{
    showMatches: () => dispatch(showMatches()),
    select_user: (match) => dispatch({type:'SELECT_USER', payload: match})
  }
}

const mapStateToProps = state => {
  return{
    info: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);
