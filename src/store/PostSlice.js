import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/posts.json');
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
  },
  reducers: {
    setPosts: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    createPost: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      }));
  },
});

export const createPostAsync = createAsyncThunk(
  'posts/createPost',
  async (requestBody) => {
    const response = await axios.post('/posts.json', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

export const { setPosts, createPost } = postSlice.actions;
export default postSlice.reducer;
