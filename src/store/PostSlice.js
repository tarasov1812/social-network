import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
  },
  reducers: {
    setPosts: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
    },
  },
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/posts.json');
  return response.data;
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
