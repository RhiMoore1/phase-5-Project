import React, {useState, useEffect } from 'react';
import '../components/NavBar.css';

const handleLogout = ({updateUser}) => {
  fetch('/logout', {method: "DELETE"})
    .then(r => {
      updateUser(null)
    })
  
}


function NavBar() {
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

  return (
    <div className='navbarContainer'>
      { user ? (<p>Welcome {user.username}</p>) : (<p>Not logged in</p>) }
      <h2 className='header'><a href='/'>Parks in Arizona</a></h2>
      <nav className='navbar'>
        <li className='navLi'>
          <a href='/parks'>Parks</a>
        </li>
        <li className='navLi'>
          <a href='/signup'>Sign Up</a>
        </li>
        <li className='navLi'>
          <a href='/login'>Login</a>
        </li>
        <li className='navLi'>
          <a href='/logout' onClick={handleLogout}>Log Out</a>
        </li>
        <li className='navLi'>
          <a href="/reviews">Reviews</a>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;


