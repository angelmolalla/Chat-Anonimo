import React, { Component } from "react";
import * as firebase from "firebase";
import Swal from "sweetalert2";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.isBackButtonClicked = false;
  }

  addUser(nick) {
    const listUser = this.state.users;
    const user = {
      id: this.state.users.length,
      nick: nick,
      anonymous: true,
    };
    this.setState({ users: listUser });
    sessionStorage.setItem("nick", nick);
    sessionStorage.setItem("id", this.state.users.length);
    sessionStorage.setItem("anonymous", true);
    firebase.database().ref(`users/${user.id}`).set(user);
  }
  messageUser() {
    Swal.fire({
      title: "Are you want to use an anonymous user?",
      text: "Anonymous user will be random",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No, I want to create a new user!",
    }).then((result) => {
      if (result.value) {
        let lastKey = this.state.users.length;
        let nick = "anonymous" + lastKey;
        this.addUser(nick);
        Swal.fire("Login as anonymous", "His nick is: " + nick, "success");
      } else {
        this.props.history.push("/addUser");
      }
    });
  }

  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", this.onBackButtonEvent);
    firebase
      .database()
      .ref("users/")
      .on("value", (snapshot) => {
        const currentUser = snapshot.val();
        if (currentUser !== null) {
          this.setState({
            users: currentUser,
          });
        }
        this.messageUser();
      });
  }
  render() {
    return <h1>New User</h1>;
  }
}

export default NewUser;
