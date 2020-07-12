import React, { Component } from "react";
import * as firebase from "firebase";
import "./Chat.css";
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("categories/")
      .on("value", (snapshot) => {
        const currentUser = snapshot.val();
        if (currentUser !== null) {
          this.setState({
            categories: currentUser,
          });
        }
      });
  }

  nextPath(path,id) {
    this.props.history.push(path+id);
  }

  render() {
    return (
      <div className="container-fluid">
        <legend>Categories</legend>
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
                        CATEGORY
                      </th>
                      <th scope="col" className="text-center">
                        OPERATION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.categories.map((row) => (
                      <tr className="table-secondary" key={row.id}>
                        <th scope="row" className="text-center">
                          {row.id}
                        </th>
                        <th scope="row" className="text-center">
                          {row.category}
                        </th>
                        <th scope="row" className="text-center">
                          <button type="button" onClick={() => this.nextPath('/chatCategory/',row.category) } className="btn btn-success">
                            Go
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

export default Categories;
