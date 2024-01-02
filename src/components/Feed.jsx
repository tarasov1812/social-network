import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserInfoWithId
} from '../store/PostSlice.js';
import '../App.css';

import Logo from './Logo.jsx';
import Posts from './Posts.jsx';
import Profile from './Profile.jsx';
import CreateMessage from './CreateMessage.jsx';
import Themes from './Themes.jsx';
import Recomendations from './Recomendations.jsx';
import Modal from './Modal.jsx';

function Feed() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.posts.currentUser);
  const isLoadingCurrentUser = useSelector((state) => state.posts.isLoadingCurrentUser);
  const [modalActive, setModalActive] = useState(false);
  // if (!isLoadingCurrentUser) {
  //   const currentUserId = currentUser.id;
  //   console.log(currentUserId);
  //   dispatch(fetchUserInfoWithId({ currentUserId, currentUserId }))
  //   .then((response) => {
  //   })
  //   .catch((error) => {
  //     console.log(error);
  // });

  // }

  return (
    <>
      <Logo />
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
