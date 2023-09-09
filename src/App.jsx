import React from 'react';
import './App.css';

import Logo from './components/Logo.jsx';
import Header from './components/Header.jsx';
import Posts from './components/Posts.jsx';
import Profile from './components/Profile.jsx';
import CreateMessage from './components/CreateMessage.jsx';
import Themes from './components/Themes.jsx';
import Recomendations from './components/Recomendations.jsx';

function App() {
  return (
    <>
      <Logo />
      <Header />
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      >
        <div>
          <CreateMessage />
          <Posts />
        </div>
        <div>
          <Profile />
          <Themes />
          <Recomendations />
        </div>
      </div>
    </>
  );
}

export default App;
