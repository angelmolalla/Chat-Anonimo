import React from "react";
import {BrowserRouter  as Router,Route,Switch }from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NavigationBar from "./components/NavigationBar";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
      <Router>
        <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/chatRoom" component={ChatRoom}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
