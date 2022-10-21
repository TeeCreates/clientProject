import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Calender from "./Calender";
import About from "./About";
import Navbar from "./Navbar";
import { Login } from "./Login";
import Profile from "./Profile";
import BottomFooter from "./BottomFooter";
import ConfirmationPage from "./ConfirmationPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/home/:page">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            {/* <Route exact path="/about">
              <About />
            </Route> */}
            <Route exact path="/calender">
              <Calender />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/confirmed">
              <ConfirmationPage />
            </Route>
            {/* <Route>
              <ConfirmationPage />
            </Route> */}
          </Switch>
        </div>
        <BottomFooter />
      </div>
    </Router>
  );
}

export default App;
