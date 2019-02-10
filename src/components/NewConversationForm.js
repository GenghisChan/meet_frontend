import React from 'react';
import { API_ROOT } from '../constants';
const token = localStorage.getItem("token")

class NewConversationForm extends React.Component {
  state = {
    conversation: {
    title: ''
    }
  };

  handleChange = e => {
    this.setState({conversation: { title: e.target.value }});
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Token ' + token
      },
      body: JSON.stringify(this.state)
    }).then(this.setState({ title: '' }));
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.conversation.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
