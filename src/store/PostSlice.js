import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/posts.json');
  return response.data;
});

export const fetchUser = createAsyncThunk('posts/fetchUser', async () => {
  try {
    const response = await axios.get('/feed');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/';
    }
    throw error;
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    currentUser: {
    },
    isLoadingUser: true,
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
    setCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      }))
      .addCase(fetchUser.pending, (state) => ({
        ...state,
        isLoadingUser: true,
      }))
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        isLoadingUser: false,
        currentUser: action.payload,
      }))
      .addCase(fetchUser.rejected, (state) => ({
        ...state,
        isLoadingUser: false,
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

export const changeProfileDate = createAsyncThunk(
  'user/changeProfileDate',
  async ({ id, requestBody }) => {
    const response = await axios.put(`/changeProfileDate/${id}`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

export const { setPosts, createPost, setCurrentUser } = postSlice.actions;
export default postSlice.reducer;
