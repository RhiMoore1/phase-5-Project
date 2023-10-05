import React, {useState, useEffect } from 'react';
import '../components/NavBar.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const handleLogout = ({updateUser}) => {
  fetch('/logout', {method: "DELETE"})
    .then(r => {
      updateUser(null)
    })
  
}

function NavBar({updateUser}) {
  const [user, setUser] = useState(null);
  
  const fetchUser = () => {
    fetch("/checkSession")
      .then(r => {
        if(r.ok){
          r.json().then(user => setUser(user))
        } else {
          // r.json().then(error => setErrors(error))
        }
      })
  }
  useEffect(() => {
    fetchUser()
  }, []);
  // const updateUser = (user) => setUser(user)
  return (
      <div className='navbarContainer'>
      { user ? (<p>Welcome {user.username}</p>) : (<p>Not logged in</p>) }
      <h2 className='header'><a href='/'>Parks in Arizona</a></h2>
      <nav className='navbar'>
      {/* <Router> */}
        <li className='navLi'>
          <Link to="/parks">Parks</Link>
          {/* <a href='/parks'>Parks</a> */}
        </li>
        <li className='navLi'>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li className='navLi'>
          <Link to='/login'>Login</Link>
        </li>
        <li className='navLi'>
          <Link to='/logout' onClick={handleLogout}>Log Out</Link>
        </li>
        <li className='navLi'>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className='navLi'>
          <Link to='/parks/new'>Add New Park</Link>
        </li>
        {/* </Router> */}
      </nav>
    </div>
  );
}

export default NavBar;


