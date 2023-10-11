import React, { useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts, fetchPosts } from './store/PostSlice.js';
import './App.css';

import Feed from './components/Feed.jsx';

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
    <Feed />
  );
}

export default App;
