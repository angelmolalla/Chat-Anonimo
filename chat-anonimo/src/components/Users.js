import React, { Component } from "react";
import * as firebase from "firebase";
import "./ChatRoom.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
                      <tr className="table-secondary" key={row.id}>
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
