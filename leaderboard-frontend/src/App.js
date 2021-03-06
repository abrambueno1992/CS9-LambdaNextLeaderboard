//________MODULES________
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import { Container } from "semantic-ui-react";
// TODO import axios from 'axios';

//________REACT COMPONENTS________
import NAVBAR from "./components/Navbar/Nav";
import CLASSLIST from "./components/Classlist/index";
import LANDINGPAGE from "./components/LandingPage/LandingPage";
import CREATEEDIT from "./components/CreateOrEditClass/CreateEditClass";
// import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/OverallLeaderboard";
// import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/WeeklyLeaderboard";
// import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/ActivityFeed";
// import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/HotRightNow";
//import BILLING from "./components/Billing/Billing";

//________STYLING________
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogOut = () => {
    localStorage.removeItem("token");
    // window.location.reload();
  };

  render() {
    return (
      <Router>
        <div className="APP">
          <Route path="/" component={NAVBAR} />
          <div className="APP__BODY">
            {/*<Switch>*/}
            <Route exact path="/" component={LANDINGPAGE} />
            <Route exact path="/classlist" component={CLASSLIST} />
            <Route
              path="/classlist/:name/"
              exact
              component={withRouter(CREATEEDIT)}
            />
            {/* <Route exact path="/billing" component={BILLING} /> */}
            {/*</Switch>*/}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
