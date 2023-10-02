import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ParkContainer from "./ParkContainer"
import NavBar from "./NavBar";
import Home from "./Home";
import ReviewsContainer from "./ReviewsContainer";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/parks">
            <ParkContainer />
          </Route>
          <Route path="/reviews">
            <ReviewsContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
