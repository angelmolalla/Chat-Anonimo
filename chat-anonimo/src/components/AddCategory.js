import React, { Component } from "react";
import * as firebase from "firebase";
import "./Chat.css";
import Swal from "sweetalert2";
class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categories: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const listCategory = this.state.categories;
    const category = {
      id: this.state.categories.length,
      category: this.state.category
    };
    const validateCategory = this.state.categories
      .map(function (e) {
        return e.category;
      })
      .find((element) => element == this.state.category);

    if (Object.keys(this.state.category).length === 0) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Category is empty",
      });
      return;
    }

    if (validateCategory) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Category is already in use",
      });
      return;
    }

    this.setState({ users: listCategory });
    firebase.database().ref(`categories/${category.id}`).set(category);
    Swal.fire(
      "Correct Operation!",
      "New category added," + this.state.category,
      "success"
    );
    this.setState({ category: "" });
  }
  updateCategory(event) {
    this.setState({ category: event.target.value });
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <form role="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.category}
                      onChange={this.updateCategory}
                    />
                  </div>
                  <button className="btn btn-primary">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCategory;
