import React, { Component } from "react";
import validateUser from "./ValidateUser";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    const valid = validateUser();
    if (valid) {
      this.state = {
        nick: "Sin Usuario",
      };
    } else {
      this.state = {
        nick: sessionStorage.getItem("nick"),
      };
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chatGlobal">
                Chat Global
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categories">
                Chat category's
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/addCategory">
                AddCategory
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          {this.state.nick}
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
