import React from "react";
import {BrowserRouter  as Router,Route,Switch }from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NavigationBar from "./components/NavigationBar";
import ChatGlobal from "./components/ChatGlobal";
import AddUser from "./components/AddUser";
import * as firebase from "firebase";
import Users from "./components/Users";
import NewUser from "./components/NewUser";
import AddCategory from "./components/AddCategory";
import Categories from "./components/Categories";
import ChatCategory from "./components/ChatCategory";

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

function App() {
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
      <Router>
        <Switch>
        <Route exact path="/" component={NewUser}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/chatGlobal" component={ChatGlobal}></Route>
        <Route exact path="/chatCategory/:id" component={ChatCategory}></Route>
        <Route exact path="/addUser" component={AddUser}></Route>
        <Route exact path="/users" component={Users}></Route>
        <Route exact path="/addCategory" component={AddCategory}></Route>
        <Route exact path="/categories" component={Categories}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
