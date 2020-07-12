import React, { Component } from "react";
import * as firebase from "firebase";
import './ChatRoom.css';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  updateMessage(event) {
    this.setState({ message: event.target.value });
  }

  componentDidMount() {
    firebase
      .database()
      .ref("messages/")
      .on("value", (snapshot) => {
        const currentMessages = snapshot.val();
        if (currentMessages !== null) {
          this.setState({
            messages: currentMessages,
          });
        }
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    const listMessage = this.state.messages;
    const message = {
      id: this.state.messages.length,
      text: this.state.message,
    };
    this.setState({ messages: listMessage });
    firebase.database().ref(`messages/${message.id}`).set(message);
    this.setState({ message: "" });
  }
  render() {
    const { messages } = this.state;
    const messageList = messages.map((message) => {
      return (
        <div className="alert alert-dismissible alert-success"  key={message.id}>
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          {message.text}
        </div>
      );
    });
    return (
      <div className="container-fluid">
        <legend>ChatRoom</legend>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div  className="col-md-6 addScroll">{messageList}</div>
              <div className="col-md-6">
                <form role="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Message</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.message}
                      onChange={this.updateMessage}
                    />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" /> Check me out
                    </label>
                  </div>
                  <button className="btn btn-primary">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
