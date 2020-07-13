import React, { Component } from "react";
import * as firebase from "firebase";
import "./Chat.css";
import uuid from 'node-uuid';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
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

  render() {
    return (
      <div className="container-fluid">
        <legend>Users</legend>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <table className="table table-hover">
                  <thead>
                    <tr className="table-light"> 
                      <th scope="col" className="text-center">ID</th>
                      <th scope="col" className="text-center">NICK</th>
                      <th scope="col" className="text-center">ANONYMOUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((row) => (
                      <tr className="table-secondary" key={uuid()}>
                        <th scope="row" className="text-center">{row.id}</th>
                        <th scope="row" className="text-center">{row.nick}</th>
                        <th scope="row" className="text-center">
                        <input className="form-check-input" type="checkbox" checked={row.anonymous} disabled="disabled"/>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
