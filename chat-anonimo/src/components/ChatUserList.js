import React, { Component } from "react";
import * as firebase from "firebase";
import validateUser from "./ValidateUser";
class ChatNewUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  nextPath(path,id) {
    this.props.history.push(path+id);
  }

  componentDidMount() {
    const valid = validateUser();
    if (valid) {
      this.props.history.push("/");
      return;
    }
    firebase
      .database()
      .ref("users/")
      .on("value", (snapshot) => {
        let currentUser = snapshot.val();
        if (currentUser !== null) {
          currentUser = currentUser.filter(user => user.nick !== sessionStorage.getItem("nick"));

          this.setState({
            users: currentUser,
          });
        }
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <legend>List Message:</legend>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <table className="table table-hover">
                  <thead>
                    <tr className="table-light">
                      <th scope="col" className="text-center">
                        ID
                      </th>
                      <th scope="col" className="text-center">
                        NICK
                      </th>
                      <th scope="col" className="text-center">
                        ANONYMOUS
                      </th>
                      <th scope="col" className="text-center">
                        OPERATION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((row) => (
                      <tr className="table-secondary" key={row.id}>
                        <th scope="row" className="text-center">
                          {row.id}
                        </th>
                        <th scope="row" className="text-center">
                          {row.nick}
                        </th>
                        <th scope="row" className="text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={row.anonymous}
                            disabled="disabled"
                          />
                        </th>
                        <th scope="row" className="text-center">
                          <button type="button" onClick={() => this.nextPath('/chatUser/',row.nick) } className="btn btn-success">
                          Send Chat
                          </button>
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

export default ChatNewUserList;
