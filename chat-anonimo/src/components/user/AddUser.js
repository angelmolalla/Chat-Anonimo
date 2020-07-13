import React, { Component } from "react";
import * as firebase from "firebase";
import "../style/Chat.css";
import Swal from "sweetalert2";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      users: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(event) {
    this.setState({ user: event.target.value });
  }

  componentDidMount() {
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
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    const listUser = this.state.users;
    const user = {
      id: this.state.users.length,
      nick: this.state.user,
      anonymous: false,
    };
    const validateNick = this.state.users
      .map(function (e) {
        return e.nick;
      })
      .find((element) => element == this.state.user);

    if (Object.keys(this.state.user).length === 0) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Nick is empty",
      });
      return;
    }

    if (validateNick) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "The nick is already in use",
      });
      return;
    }

    this.setState({ users: listUser });
    firebase.database().ref(`users/${user.id}`).set(user);
    sessionStorage.setItem("id", this.state.users.length);
    sessionStorage.setItem("nick", this.state.user);
    sessionStorage.setItem("anonymous", false);
    Swal.fire(
      "Correct Operation!",
      "New user added, nick: " + this.state.user,
      "success"
    );
    this.setState({ user: "" });
  }
  render() {
    return (
      <div className="container-fluid">
        <legend>New User</legend>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <form role="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Nick</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.user}
                      onChange={this.updateUser}
                    />
                  </div>
                  <button className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
