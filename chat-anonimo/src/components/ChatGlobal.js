import React, { Component } from "react";
import * as firebase from "firebase";
import "./Chat.css";
import validateUser from "./ValidateUser";
import Moment from "react-moment";
class ChatGlobal extends Component {
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
    const valid = validateUser();
    if (valid) {
      this.props.history.push("/");
    }
    firebase
      .database()
      .ref("messages_global/")
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
      user: sessionStorage.getItem("nick"),
      date: Date.now(),
    };
    this.setState({ messages: listMessage });
    firebase.database().ref(`messages_global/${message.id}`).set(message);
    this.setState({ message: "" });
  }
  render() {
    const { messages } = this.state;
    const messageList = messages.map((message) => {
      if (message.user == sessionStorage.getItem("nick")) {
        return (
          <div className="alert alert-dismissible alert-success" key={this.state.messages.length}>
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <div className="row">
              <div className="col-md-6">
                <strong className="mr-auto">{message.user}</strong>
              </div>
              <div className="col-md-6">
                <small>
                  <Moment>{message.date}</Moment>
                </small>
              </div>
            </div>
            <hr />
            {message.text}
          </div>
        );
      } else {
        return (
          <div className="alert alert-dismissible alert-secondary" key={this.state.messages.length}>
            <div className="row">
              <div className="col-md-6">
                <strong className="mr-auto">{message.user}</strong>
              </div>
              <div className="col-md-6">
                <small>
                  <Moment>{message.date}</Moment>
                </small>
              </div>
            </div>
            <hr />
            {message.text}
          </div>
        );
      }
    });
    return (
      <div className="container-fluid">
        <legend>Chat global</legend>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 addScroll">{messageList}</div>
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

export default ChatGlobal;
