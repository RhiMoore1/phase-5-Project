import React, { useState } from 'react';
import '../components/Login.css';

function Login({ updateUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                username, password 
            }),
        })
            .then(r => r.json())
            .then(user => {
                updateUser(user)
                console.log(user)
            });
    }

  return (
    <div className='loginForm'>
        <form className='form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor='username'>Username</label>
            <input 
                type='text'
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor='password'>Password</label>
            <input 
                type='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login