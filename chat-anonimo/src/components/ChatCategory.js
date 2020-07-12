import React, { Component } from "react";
import * as firebase from "firebase";
import validateUser from "./ValidateUser";
import Swal from "sweetalert2";
import Moment from "react-moment";
class ChatCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      categories: [],
      message: "",
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  handleSubmit(event) {}
  componentDidMount() {
    const valid = validateUser();
    if (valid) {
      this.props.history.push("/");
    }
    firebase
      .database()
      .ref("categories/")
      .on("value", (snapshot) => {
        const currentUser = snapshot.val();
        if (currentUser !== null) {
          this.setState({
            categories: currentUser,
          });
          const validateNick =currentUser
            .map(function (e) {
              return e.category;
            })
            .find((element) => element == this.state.id);
          if (!validateNick) {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "Category is not in the database",
            });
            this.props.history.push("/categories");
          }
          else{
            this.changeMessagesChatCategory();
          }
        }
      });
  }

  changeMessagesChatCategory()
  {
    firebase
    .database()
    .ref( `messages_${this.state.id}/`)
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
    firebase.database().ref(`messages_${this.state.id}/${message.id}`).set(message);
    this.setState({ message: "" });
  }
  updateMessage(event) {
    this.setState({ message: event.target.value });
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
        <h1>Chat {this.state.id}</h1>
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

export default ChatCategory;
