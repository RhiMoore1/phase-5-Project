import React from 'react';
import '../components/NavBar.css';

function NavBar() {
 
  return (
    <div className='navbarContainer'>
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
          <a href="/reviews">Reviews</a>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;


