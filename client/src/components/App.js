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

// session.get("user_id")
function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [parks, setParks] = useState([])

  useEffect(() => {
    fetchUser()
  }, []);

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
      <Authenticate setUser={setUser} updateUser={updateUser}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/parks/new">
            <AddNew addPark={addPark}/>
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





















// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import ParkContainer from "./ParkContainer"
// import NavBar from "./NavBar";
// import Home from "./Home";
// import ReviewsContainer from "./ReviewsContainer";
// import Signup from "./Signup";
// import Login from "./Login";
// import AddNew from "./AddNew";

// // session.get("user_id")
// function App() {
//   const [user, setUser] = useState(null);
//   const [errors, setErrors] = useState([]);
//   const [parks, setParks] = useState([])

//   useEffect(() => {
//     fetchUser()
//   }, []);

//   // useEffect(() => {
//   //   fetch('/cookies')
//   //     .then(r => r.json())
//   //     .then(data => {
//   //       console.log(data)
//   //       console.log(document.cookie)
//   //     })
//   // }, []);

//   const fetchUser = () => {
//     fetch("/checkSession")
//       .then(r => {
//         if(r.ok){
//           r.json().then(user => setUser(user))
//         } else {
//           r.json().then(error => setErrors(error))
//         }
//       })
//   }
// const updateUser = (user) => setUser(user)

// const addPark = (park) =>
//     setParks((current) => [...current, park]);

//   if(!user) return(
    
//     <Router>
//       <div>
//       <Home />
//       <NavBar updateUser={updateUser} />
//       <Switch>
//         <Route path="/login">
//           <Login setUser={setUser} updateUser={updateUser}/>
//         </Route>
//         <Route path="/signup">
//           <Signup setUser={setUser} updateUser={updateUser}/>
//         </Route>
//       </Switch>
//       </div>
//     </Router>
    
//   )
//   return (
//     <Router>
//     <div>
//       <NavBar updateUser={updateUser}/>
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/parks/new">
//             <AddNew addPark={addPark}/>
//           </Route>
//           <Route path="/parks">
//             <ParkContainer />
//           </Route>
//           <Route path="/reviews">
//             <ReviewsContainer />
//           </Route>
//           {/* <Route path="/signup">
//             <Signup setUser={setUser} updateUser={updateUser} />
//           </Route>
//           <Route path="/login">
//             <Login setUser={setUser} updateUser={updateUser} />
//           </Route>  */}
//         </Switch>
//     </div>
//     </Router>
//   );
// }

// export default App;
