import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ParkContainer from "./ParkContainer"
import NavBar from "./NavBar";
import Home from "./Home";
import ReviewsContainer from "./ReviewsContainer";
import Signup from "./Signup";
import Login from "./Login";
import AddNew from "./AddNew";
import Authenticate from "./Authenticate";
import UpdatePark from "./UpdatePark";

function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [parks, setParks] = useState([])

  useEffect(() => {
    fetchUser()
    fetchParks()
  }, []);

  const fetchParks = () => {
    fetch("http://127.0.0.1:5555/parks")
      .then(r => r.json())
      .then((parks) => setParks(parks))
  }

  const fetchUser = () => {
    fetch("/checkSession")
      .then(r => {
        if(r.ok){
          r.json().then(user => setUser(user))
        } else {
          r.json().then(error => setErrors(error))
        }
      })
  }

const updateUser = (user) => setUser(user)


const addPark = (park) =>
    setParks((current) => [...current, park]);


const handleUpdatePark = (updateParkObj) => {
  const updatedParks = parks.map((park) => {
    if(park.id === updateParkObj.id) {
      return updateParkObj;
    } else {
      return park;
    }
  });
  setParks(updatedParks)
}

  if(!user) return(
    <Router>
      <div>
      <NavBar updateUser={updateUser} />
      <Switch>
        <Route exact path="/">
          <Home />
          </Route>
        <Route path="/login">
          <Login setUser={setUser} updateUser={updateUser}/>
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} updateUser={updateUser}/>
        </Route>
      </Switch>
      </div>
    </Router> 
  )
  return (
    <Router>
    <div>
      <Authenticate setUser={setUser} updateUser={updateUser} parks={parks}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/parks/new">
            <AddNew addPark={addPark}/>
          </Route>
          <Route path='/parks/:id'>
            <UpdatePark onUpdatePark={handleUpdatePark}/>
          </Route>
          <Route path="/parks">
            <ParkContainer />
          </Route>
          <Route path="/reviews">
            <ReviewsContainer />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
