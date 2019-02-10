import React, { Component } from 'react';
import NewMessageForm from './NewMessageForm';
import '../stylesheets/MessagesArea.css'

class MessagesArea extends Component {

  constructor(props){
   super(props)
   this.state = {
     user_id: this.props.user_id,
     username: this.props.username,
     conversationId: this.props.conversation.id,
     conversationTitle: this.props.conversation.title,
     messages: this.props.conversation.messages,
     recieverName: this.props.conversation.recieverName,
     recieverId: this.props.conversation.reciever_Id

   }
 }

   orderedMessages = (messages, user) => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      return <li key={message.id}>{message.text}</li>
    })
  }

render(){
  const {user_id, username, conversationId, conversationTitle, messages, receiverName, receiverId} = this.state
  return (
    <div className="messagesArea">
      <h2> Messages </h2>
      <div className="messagesArea">
        <h2>{conversationTitle}</h2>
        <ul>{this.orderedMessages(this.props.conversation.messages, user_id)}</ul>
        <NewMessageForm conversation_id={conversationId} user_id={user_id} />
      </div>
    </div>
  );
 }
}


export default MessagesArea;
