import React, { useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserPostsWithId, fetchUserInfoWithId, fetchSubscribers, fetchSubscribed,
} from '../store/PostSlice.js';

import Logo from './Logo.jsx';
import Posts from './Posts.jsx';
import Themes from './Themes.jsx';
import Recomendations from './Recomendations.jsx';
import ProfilePageBanner from './ProfilePageBanner.jsx';
import Subscribers from './Subscribers.jsx';

function ProfilePage() {
  const [dispatched, setDispatched] = useState(false);
  const [dispatched2, setDispatched2] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  const parsedId = parseInt(id, 10);

  if (parsedId && !dispatched) {
    dispatch(fetchUserPostsWithId({ id }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setDispatched(true);
  }

  let userToViewData = {};
  let postsToView = [];
  let subscribersToShow = [];
  let subscribedToShow = [];

  const allMessages = useSelector((state) => state.posts.data);
  const currentUser = useSelector((state) => state.posts.currentUser);

  const postsFoundById = useSelector((state) => state.posts.postsFoundById);
  const userFoundById = useSelector((state) => state.posts.userFoundById);
  const subscribers = useSelector((state) => state.posts.subscribers);
  const subscribed = useSelector((state) => state.posts.subscribed);

  const isLoadingPostsWithId = useSelector((state) => state.posts.isLoadingPostsWithId);
  const isLoadingUserWithId = useSelector((state) => state.posts.isLoadingUserWithId);
  const isLoadingCurrentUser = useSelector((state) => state.posts.isLoadingCurrentUser);
  const isLoadingSubscribers = useSelector((state) => state.posts.isLoadingSubscribers);
  const isLoadingSubscribed = useSelector((state) => state.posts.isLoadingSubscribed);

  if (parsedId && !dispatched2 && !isLoadingCurrentUser) {
    const currentUserId = currentUser.id;
    dispatch(fetchUserInfoWithId({ id, currentUserId }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(fetchSubscribers({ id, currentUserId }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(fetchSubscribed({ id, currentUserId }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setDispatched2(true);
  }

  if (!isLoadingPostsWithId && currentUser.id !== parsedId) {
    postsToView = [...postsFoundById];
  }

  if (!isLoadingSubscribers) {
    subscribersToShow = [...subscribers];
  }

  if (!isLoadingSubscribed) {
    subscribedToShow = [...subscribed];
  }

  if (!isLoadingUserWithId) {
    userToViewData = { ...userFoundById };
  }

  const [showSubscribers, setShowSubscribers] = useState(false);
  const [subscribedToShowProps, setSubscribedToShowProps] = useState([]);
  const [subscribersToShowProps, setSubscribersToShowProps] = useState([]);

  const handleFollowersClick = () => {
    setSubscribedToShowProps([]);
    setSubscribersToShowProps(subscribersToShow);

    setShowSubscribers(true);
  };

  const handleFollowingClick = () => {
    setSubscribersToShowProps([]);
    setSubscribedToShowProps(subscribedToShow);
    setShowSubscribers(true);
  };

  const handleMessagesClick = () => {
    setShowSubscribers(false);
  };

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
          <ProfilePageBanner
            userToViewData={userToViewData}
            onFollowersClick={handleFollowersClick}
            onFollowingClick={handleFollowingClick}
            onMessagesClick={handleMessagesClick}
          />
          {!showSubscribers && (
            <Posts postsToView={postsToView} />
          )}
          {showSubscribers && (
            <Subscribers
              subscribersToShowProps={subscribersToShowProps}
              subscribedToShowProps={subscribedToShowProps}
            />
          )}
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
