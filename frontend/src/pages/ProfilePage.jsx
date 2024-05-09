import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../store/DifferentUserSlice.js';
import Logo from '../components/Logo.jsx';
import Posts from '../components/Posts.jsx';
import Themes from '../components/Themes.jsx';
import Recomendations from '../components/Recomendations.jsx';
import ProfilePageBanner from '../components/ProfilePageBanner.jsx';
import Subscribers from '../components/Subscribers.jsx';

function ProfilePage() {
  const dispatch = useDispatch();
  // get the id of user to watch
  let { id } = useParams();
  const parsedId = parseInt(id, 10);

  // array and object to show data in props
  let userToViewData = {};
  let postsToView = [];
  let subscribersToShow = [];
  let subscribedToShow = [];

  // load information from the Store about current user
  const allMessages = useSelector((state) => state.currentUser.data);
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  // load dipatchs results from the Store
  const postsFoundById = useSelector((state) => state.differentUser.postsFoundById);
  const userInfo = useSelector((state) => state.differentUser.userInfo);
  const subscribers = useSelector((state) => state.differentUser.subscribers);
  const subscribed = useSelector((state) => state.differentUser.subscribed);

  // information about finishing loadings
  const isLoadingCurrentUser = useSelector((state) => state.currentUser.isLoadingCurrentUser);
  const userDetailsLoading = useSelector((state) => state.differentUser.userDetailsLoading);



  if (!userDetailsLoading && currentUser.id !== parsedId) {
    postsToView = [...postsFoundById];
  }

  if (!userDetailsLoading) {
    userToViewData = { ...userInfo };
    subscribersToShow = [...subscribers];
    subscribedToShow = [...subscribed];
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
      if (allMessages[i].authorId === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }
  // if at there is no any parameter in the link - dont load messages from the server
  if (Number.isNaN(parsedId)) {
    userToViewData = {};
    postsToView = [];
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].authorId === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }

  const currentUserId = currentUser.id;
  useEffect(() => {
    // Load user details if not loading and ID is available
    if (!isLoadingCurrentUser && parsedId) {
      if (id === undefined) {

        id = currentUser.id.toString();
      }
      dispatch(fetchUserDetails({ id, currentUserId }));
    }
    // Reset subscribers and posts when ID changes
    setSubscribersToShowProps([]);
    setSubscribedToShowProps([]);
    setShowSubscribers(false);
  }, [dispatch, id, parsedId, currentUserId, isLoadingCurrentUser, currentUser.id]);

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
              userToViewData={userToViewData}
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
