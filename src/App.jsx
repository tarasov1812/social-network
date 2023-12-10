import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import {
  fetchPosts, fetchUser,
} from './store/PostSlice.js';
import './App.css';

import Feed from './components/Feed.jsx';
import Profile from './components/Profile.jsx';
import Header from './components/Header.jsx';
import EditProfile from './components/EditProfile.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import Settings from './components/Settings.jsx';
import ChangeEmail from './components/ChangeEmail.jsx';
import Recomendations from './components/Recomendations.jsx';
import ProfilePage from './components/ProfilePage.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/app/" element={<Header />}>
    <Route index element={<Feed />} />
    <Route path="feed" element={<Feed />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="login" element={<Recomendations />} />
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

  useEffect(() => {
    dispatch((fetchUser()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
