import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import {
  fetchCurrentUserPosts, fetchUser, fetchThemes, fetchChannels,
} from './store/PostSlice.js';
import './App.css';

import Feed from './components/Feed.jsx';
import Header from './components/Header.jsx';
import EditProfile from './components/EditProfile.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import Settings from './components/Settings.jsx';
import ChangeEmail from './components/ChangeEmail.jsx';
import ProfilePage from './components/ProfilePage.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/app/" element={<Header />}>
    <Route index element={<Feed />} />
    <Route path="feed" element={<Feed />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="profile/:id" element={<ProfilePage />} />
    <Route path="login" element={<ProfilePage />} />
    <Route path="settings/" element={<Settings />}>
      <Route index element={<EditProfile />} />
      <Route path="profile-settings" element={<EditProfile />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="change-email" element={<ChangeEmail />} />
    </Route>
  </Route>,
));

function App() {
  const dispatch = useDispatch();

  // Get current user id, and then all post related with this user id
  dispatch(fetchUser())
    .then((response) => {
      const { id } = response.payload;
      dispatch(fetchCurrentUserPosts(id))
        .then((postsResponse) => {
          console.log(postsResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  dispatch(fetchThemes())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  dispatch(fetchChannels())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <RouterProvider router={router} />
  );
}

export default App;
