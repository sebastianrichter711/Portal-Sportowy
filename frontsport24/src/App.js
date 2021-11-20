import React from 'react';
import Expo from './Home';
import './style.css'
import fb from './images/fb.png'
import insta from './images/insta.png'
import twit from './images/twit.png'

function App() {
  return (
    <div className="div">
      <h1 className="logo">SPORTINFO24</h1>
  <Expo />
  <a href="https://facebook.com">
    <img className="fbImg" src={fb} alt="fb"/>
  </a>
  <a href="https://twitter.com">
    <img className="twImg" src={twit} alt="twit"/>
  </a>
  <a href="https://instagram.com">
    <img className="insImg" src={insta} alt="insta"/>
  </a>
  <button className="registerButton">Zarejestruj się</button>
  <button className="loginButton">Zaloguj się</button>
  <button className="scoresButton">WYNIKI</button>
  <h1 className="newestNews">Najnowsze</h1>
  </div>
  );
}

export default App;
