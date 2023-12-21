import React, { useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserPostsWithId, fetchUserInfoWithId,
} from '../store/PostSlice.js';

import Logo from './Logo.jsx';
import Posts from './Posts.jsx';
import Themes from './Themes.jsx';
import Recomendations from './Recomendations.jsx';
import ProfilePageBanner from './ProfilePageBanner.jsx';

function ProfilePage() {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  const parsedId = parseInt(id, 10);

  let userToViewData = {};
  let postsToView = [];

  const allMessages = useSelector((state) => state.posts.data);
  const currentUser = useSelector((state) => state.posts.currentUser);

  const postsFoundById = useSelector((state) => state.posts.postsFoundById);
  const userFoundById = useSelector((state) => state.posts.userFoundById);

  const isLoadingPostsWithId = useSelector((state) => state.posts.isLoadingPostsWithId);
  const isLoadingUserWithId = useSelector((state) => state.posts.isLoadingUserWithId);
  const isLoadingCurrentUser = useSelector((state) => state.posts.isLoadingCurrentUser);

  if (parsedId && !dispatched && !isLoadingCurrentUser) {
    const currentUserId = currentUser.id;
    console.log(currentUserId);
    dispatch(fetchUserInfoWithId({ id, currentUserId }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(fetchUserPostsWithId({ id }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setDispatched(true);
  }

  if (!isLoadingPostsWithId && currentUser.id !== parsedId) {
    postsToView = [...postsFoundById];
  }

  if (!isLoadingUserWithId) {
    userToViewData = { ...userFoundById };
  }

  if (currentUser.id === parsedId) {
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }
  if (Number.isNaN(parsedId)) {
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }

  return (
    <>
      <Logo />
      <div className="content">
        <div>
          <ProfilePageBanner userToViewData={userToViewData} />
          <Posts postsToView={postsToView} />
        </div>
        <div>
          <Themes />
          <Recomendations />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
