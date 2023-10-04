import React from 'react';
import '../components/Home.css';
import Signup from './Signup';
import Login from './Login';
import '../components/Signup.css';
import '../components/Login.css';

function Home() {
  return (
    <div className='image'>
        <img className='home' src='https://afar.brightspotcdn.com/dims4/default/584f136/2147483647/strip/true/crop/2000x1000+0+167/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fe4%2Ffe%2Fe3a23c5dcd15d774671b1de412e8%2Foriginal-grand-20canyon.jpg' />
          <div id='forms'>
            <Login  setUser={setUser} updateUser={updateUser}/>
            <Signup  setUser={setUser} updateUser={updateUser}/>
          </div>
    </div>
  )
}

export default Home