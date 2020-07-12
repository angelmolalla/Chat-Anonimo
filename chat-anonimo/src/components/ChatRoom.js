import React, { Component } from "react";
import * as firebase from "firebase";
import './ChatRoom.css';

export const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
export const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
export const BASE_URL = process.env.REACT_APP_FIREBASE_URL;
export const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
export const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
export const MESSAGING_SENDER_ID =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
export const APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
export const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: BASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
firebase.initializeApp(config);

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
    console.log(BASE_URL);
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
