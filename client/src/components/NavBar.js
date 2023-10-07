import React from 'react';
import '../components/NavBar.css';
import { Link } from "react-router-dom";

function NavBar({user}) {
  return (
      <div className='navbarContainer'>
      { user ? (<p>Welcome {user.username}</p>) : (<p>Not logged in</p>) }
      <h2 className='header'><a href='/'>Parks in Arizona</a></h2>
      <nav className='navbar'>
        <li className='navLi'>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li className='navLi'>
          <Link to='/login'>Login</Link>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;