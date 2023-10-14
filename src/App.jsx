import React, { useState, useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts, fetchPosts } from './store/PostSlice.js';
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
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts) {
      dispatch(setPosts(posts));
    }
  }, [dispatch, posts]);

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
