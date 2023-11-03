import React, { useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import { setPosts, fetchPosts } from './store/PostSlice.js';
import './App.css';

import Feed from './components/Feed.jsx';
import Profile from './components/Profile.jsx';
import Header from './components/Header.jsx';
import Recomendations from './components/Recomendations.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/app/" element={<Header />}>
    <Route index element={<Feed />} />
    <Route path="feed" element={<Feed />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Recomendations />} />
  </Route>,
));

function App() {
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
    <RouterProvider router={router} />
  );
}

export default App;
