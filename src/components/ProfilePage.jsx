import React, { useState, useEffect } from 'react';
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
  const dispatch = useDispatch();
  // using dispatched variables for dipatch just once
  const [dispatched, setDispatched] = useState(false);
  const [dispatched2, setDispatched2] = useState(false);

  // get the id of user to watch
  const { id } = useParams();
  const parsedId = parseInt(id, 10);

  // array and object to show data in props
  let userToViewData = {};
  let postsToView = [];
  let subscribersToShow = [];
  let subscribedToShow = [];

  // get selected users posts
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

  // load information from the Store about current user
  const allMessages = useSelector((state) => state.posts.data);
  const currentUser = useSelector((state) => state.posts.currentUser);

  // load dipatchs results from the Store
  const postsFoundById = useSelector((state) => state.posts.postsFoundById);
  const userFoundById = useSelector((state) => state.posts.userFoundById);
  const subscribers = useSelector((state) => state.posts.subscribers);
  const subscribed = useSelector((state) => state.posts.subscribed);

  // information about finishing loadings
  const isLoadingPostsWithId = useSelector((state) => state.posts.isLoadingPostsWithId);
  const isLoadingUserWithId = useSelector((state) => state.posts.isLoadingUserWithId);
  const isLoadingCurrentUser = useSelector((state) => state.posts.isLoadingCurrentUser);
  const isLoadingSubscribers = useSelector((state) => state.posts.isLoadingSubscribers);
  const isLoadingSubscribed = useSelector((state) => state.posts.isLoadingSubscribed);

  // dispatch data from the server with this conditions
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

  // show different components depends on user choise
  const [showSubscribers, setShowSubscribers] = useState(false);
  // array to throw on props (by default are empty)
  const [subscribedToShowProps, setSubscribedToShowProps] = useState([]);
  const [subscribersToShowProps, setSubscribersToShowProps] = useState([]);

  // if user click on Followers button -  show Subscribers props with followers array
  // and clean followed array
  const handleFollowersClick = () => {
    setSubscribedToShowProps([]);
    setSubscribersToShowProps(subscribersToShow);

    setShowSubscribers(true);
  };

  // if user click on Followed button -  show Subscribers props with followed array
  // and clean followers array
  const handleFollowingClick = () => {
    setSubscribersToShowProps([]);
    setSubscribedToShowProps(subscribedToShow);
    setShowSubscribers(true);
  };

  // if user click on posts button -  show Posts props with posts array
  // and clean followers and followed array
  const handleMessagesClick = () => {
    setSubscribersToShowProps([]);
    setSubscribedToShowProps([]);
    setShowSubscribers(false);
  };

  // dont load messages from server if the selected user is current user
  if (currentUser.id === parsedId) {
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }
  // if at there is no any parametr in the link - dont load messages from the server
  if (Number.isNaN(parsedId)) {
    userToViewData = {};
    postsToView = [];
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }

  // Reset dispatched values when `id` changes
  useEffect(() => {
    setDispatched(false);
    setDispatched2(false);
    setSubscribersToShowProps([]);
    setSubscribedToShowProps([]);
    setShowSubscribers(false);
  }, [id]);

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
