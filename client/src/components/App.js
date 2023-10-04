import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ParkContainer from "./ParkContainer"
import NavBar from "./NavBar";
import Home from "./Home";
import ReviewsContainer from "./ReviewsContainer";
import Signup from "./Signup";
import Login from "./Login";

// session.get("user_id")
function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetchUser()
  }, []);

  // useEffect(() => {
  //   fetch('/cookies')
  //     .then(r => r.json())
  //     .then(data => {
  //       console.log(data)
  //       console.log(document.cookie)
  //     })
  // }, []);

  const fetchUser = () => {
    fetch("/checkSession")
      .then(r => {
        if(r.ok){
          r.json().then(user => setUser())
        } else {
          r.json().then(error => setErrors(error))
        }
      })
      // .then(data => console.log(data))
  }
const updateUser = (user) => setUser(user)


  return (
    <div>
      <NavBar updateUser={updateUser}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home setUser={setUser} updateUser={updateUser}/>
          </Route>
          <Route path="/parks">
            <ParkContainer />
          </Route>
          <Route path="/reviews">
            <ReviewsContainer />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} updateUser={updateUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} updateUser={updateUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
