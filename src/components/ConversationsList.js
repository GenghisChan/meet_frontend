import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
const token = localStorage.getItem("token")



class ConversationsList extends React.Component {

  constructor(props){
  super(props)
  this.state = {
      conversations: props.user.conversations,
      user_id: this.props.user.id,
      username: this.props.user.name,
      activeConversation: null,
      users:this.props.user.inactive,
      conversationId: ''
 }
};

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: 'Token ' + token
        }
      })
      .then(res => res.json()) //fetches all conversations, ever
      .then(conversations => this.setState({ conversations }))
      //returns list of conversations, that have a messages array
      // ;
  };

  handleUsersClick = (obj) => {
    // console.log(this.state)
    // debugger
    let copy = [...this.state.users]
    copy = copy.filter(user => user.id !== obj.id)
    this.setState({
      users: copy
    })


    fetch('http://localhost:3000/followers',{
      method: "POST",
      headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({currentU:this.props.user.name,otherU:obj.name})
    })

  }

  handleClick = id => { //id of the clicked conversation
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    // debugger
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    // debugger // on received of message send that to
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id //equal to message convo id?? message not even created
    );
    conversation.messages = [...conversation.messages, message]; //adding new messages inside a conversation
    this.setState({ conversations });
  };


  render = () => {
    console.log('Conversations in convoList', this.state.conversations)
    console.log('ActiveConvo in convoList', this.state.activeConversation)
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm />
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )} user_id={this.state.user_id} username={this.state.username}
          />
        ) : null}

        <div className="conversations" >
         <h2>Conversations</h2>
         <ul>{mapConversations(conversations, this.handleClick, this.props.user.name)}</ul>
       </div>
      </div>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation, name) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick, name) => {
  return conversations.map(conversation => {
    if (conversation.receiver.name === name){
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.author.name}
      </li>
    )} else {
      return (
        <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
          {conversation.receiver.name}
        </li>

    );
  }
})
};
