import React, { useState } from 'react';
import '../components/Signup.css';



function Signup({ updateUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
  

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
              firstname,
              lastname,
              email,
            
            }),
          })
            .then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                updateUser(user)
                console.log(user)
                
              });
            }
          });
    }

  return (
    <div className='signupForm'>
        <form className='form' onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <label htmlFor='firstname'>First Name</label>
            <input 
                type='text'
                id="firstname"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
            />

            <label htmlFor='lastname'>Last Name</label>
            <input 
                type='text'
                id="lastname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
            />

            <label htmlFor='username'>Username</label>
            <input 
                type='text'
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor='email'>Email</label>
            <input 
                type='text'
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor='password'>Password</label>
            <input 
                type='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              
            />
            <button type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default Signup