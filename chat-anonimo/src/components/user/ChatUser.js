import React, { Component } from "react";
import * as firebase from "firebase";
import validateUser from "../ValidateUser";
import Swal from "sweetalert2";
import Moment from "react-moment";
import uuid from "node-uuid";

class ChatUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      users: [],
      usersReceiver: [],
      message: "",
      messages: [],
      messagesReceiver: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
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
    firebase
      .database()
      .ref(
        `messages_${sessionStorage.getItem("nick")}/${this.state.id}/${
          message.id
        }`
      )
      .set(message);
    firebase
      .database()
      .ref(
        `messages_${this.state.id}/${sessionStorage.getItem("nick")}/${
          message.id
        }`
      )
      .set(message);
    this.setState({ message: "" });
  }

  updateMessage(event) {
    this.setState({ message: event.target.value });
  }
  validateUserSame() {
    if (sessionStorage.getItem("nick") == this.props.match.params.id) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    const valid = validateUser();
    const validUserSame = this.validateUserSame();
    if (valid) {
      this.props.history.push("/");
      return;
    }
    if (validUserSame) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "You can't send chats to yourself",
      });
      this.props.history.push("/chatUserList");
      return;
    }

    firebase
      .database()
      .ref("users/")
      .on("value", (snapshot) => {
        const currentUser = snapshot.val();
        if (currentUser !== null) {
          this.setState({
            users: currentUser,
          });
          const validateNick = currentUser
            .map(function (e) {
              return e.nick;
            })
            .find((element) => element == this.state.id);

          if (!validateNick) {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "User is not in the database",
            });
            this.props.history.push("/chatNewUserList");
          } else {
            this.changeMessagesChatCategory(
              sessionStorage.getItem("nick"),
              this.state.id,
              true
            );
            this.changeMessagesChatCategory(
              this.state.id,
              sessionStorage.getItem("nick"),
              false
            );
          }
        }
      });
  }

  changeMessagesChatCategory(sender, receiver, chat) {
    if (chat) {
      firebase
        .database()
        .ref(`messages_${sender}/${receiver}/`)
        .on("value", (snapshot) => {
          const currentMessages = snapshot.val();
          if (currentMessages !== null) {
            this.setState({
              messages: currentMessages,
            });
          }
        });
    } else {
      firebase
        .database()
        .ref(`messages_${sender}/${receiver}/`)
        .on("value", (snapshot) => {
          const currentMessages = snapshot.val();
          if (currentMessages !== null) {
            this.setState({
              messagesReceiver: currentMessages,
            });
          }
        });
    }
  }
  render() {
    const { messages } = this.state;
    const messageList = messages.map((message) => {
      if (message.user == sessionStorage.getItem("nick")) {
        return (
          <div className="alert alert-dismissible alert-success" key={uuid()}>
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
          <div className="alert alert-dismissible alert-secondary" key={uuid()}>
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
        <h1>Chat for: {this.state.id}</h1>
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

export default ChatUser;
