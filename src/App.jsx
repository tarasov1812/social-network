import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts } from './store/postSlice.js';
import axios from 'axios'; 
import './App.css';

import Logo from './components/Logo.jsx';
import Header from './components/Header.jsx';
import Posts from './components/Posts.jsx';
import Profile from './components/Profile.jsx';
import CreateMessage from './components/CreateMessage.jsx';
import Themes from './components/Themes.jsx';
import Recomendations from './components/Recomendations.jsx';
import Modal from './components/Modal.jsx';

function App() {
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/posts.json')
      .then((response) => {
        dispatch(setPosts(response.data));
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [dispatch]);
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

export default App;
