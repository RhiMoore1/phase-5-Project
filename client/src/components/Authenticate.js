import React, {useState, useEffect } from 'react';
import '../components/Authenticate.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function Authenticate({updateUser}) {
  const [user, setUser] = useState(null);
  const history = useHistory()

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    //   .then(r => r.json())
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
           <Link to='/logout' onClick={handleLogout}>Log Out</Link>
         </li>
         <li className='authLi'>
           <Link to='/parks/new'>Add New Park</Link>
         </li> 
      </nav>
    </div>
  );
}

export default Authenticate;












// import React, {useState, useEffect } from 'react';
// import '../components/auth.css';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// const handleLogout = ({updateUser}) => {
//   fetch('/logout', {method: "DELETE"})
//     .then(r => {
//       updateUser(null)
//     })
  
// }

// function auth({updateUser}) {
//   const [user, setUser] = useState(null);
  
//   const fetchUser = () => {
//     fetch("/checkSession")
//       .then(r => {
//         if(r.ok){
//           r.json().then(user => setUser(user))
//         } else {
//           // r.json().then(error => setErrors(error))
//         }
//       })
//   }
//   useEffect(() => {
//     fetchUser()
//   }, []);
//   // const updateUser = (user) => setUser(user)
//   return (
//       <div className='authContainer'>
//       { user ? (<p>Welcome {user.username}</p>) : (<p>Not logged in</p>) }
//       <h2 className='header'><a href='/'>Parks in Arizona</a></h2>
//       <auth className='auth'>
//       {/* <Router> */}
//         {/* <li className='authLi'>
//           <Link to="/parks">Parks</Link>
//         </li> */}
//         <li className='authLi'>
//           <Link to='/signup'>Sign Up</Link>
//         </li>
//         <li className='authLi'>
//           <Link to='/login'>Login</Link>
//         </li>
//         {/* <li className='authLi'>
//           <Link to='/logout' onClick={handleLogout}>Log Out</Link>
//         </li>
//         <li className='authLi'>
//           <Link to="/reviews">Reviews</Link>
//         </li>
//         <li className='authLi'>
//           <Link to='/parks/new'>Add New Park</Link>
//         </li> */}
//         {/* </Router> */}
//       </auth>
//     </div>
//   );
// }

// export default auth;


