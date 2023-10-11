import React, { useState } from 'react';
import '../App.css';

import Logo from './Logo.jsx';
import Header from './Header.jsx';
import Posts from './Posts.jsx';
import Profile from './Profile.jsx';
import CreateMessage from './CreateMessage.jsx';
import Themes from './Themes.jsx';
import Recomendations from './Recomendations.jsx';
import Modal from './Modal.jsx';

function Feed() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <Logo />
      <Header />
      <div className="content">
        <div>
          <CreateMessage setActive={setModalActive} active={modalActive} />
          <Modal active={modalActive} setActive={setModalActive} />
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

export default Feed;
