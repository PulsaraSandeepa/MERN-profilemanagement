import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

//provides the store that holds data
import { Provider } from "react-redux";

import "./App.css";

//check for token

import Navbar from "../src/components/layout/Navbar";
import Landing from "../src/components/layout/Landing";
import Footer from "../src/components/layout/Footer";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import store from "../src/store";
import { clearCurrentProfile } from "./actions/profileActions";

if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user auth token and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //TODO: clear the current profile
    store.dispatch(clearCurrentProfile());

    //Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    //store provides reducer
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />

          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
