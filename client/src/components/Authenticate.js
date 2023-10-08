import React, {useState, useEffect } from 'react';
import '../components/Authenticate.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

function Authenticate({updateUser}) {
  const [user, setUser] = useState(null);
  const history = useHistory();
//   const {id} = useParams();
//   const {id} = parks

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
      .then(user => {
        console.log(user)
        updateUser(null)
        history.push('/')
      })
  }

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
      <div className='authContainer'>
      { user ? (<p>Welcome {user.username}</p>) : (<p>Not logged in</p>) }
      <h2 className='header'><a href='/'>Parks in Arizona</a></h2>

      <nav className='auth'>
        <li className='authLi'>
            <Link to="/parks">Parks</Link>
         </li> 
         <li className='authLi'>
           <Link to='/parks/new'>Add New Park</Link>
         </li>
         <li className='authLi'>
            <Link to='/parks/:id'>Update a Park</Link>
         </li>
        <li className='authLi'>
           <Link to='/logout' onClick={handleLogout}>Log Out</Link>
         </li> 
      </nav>
    </div>
  );
}

export default Authenticate;