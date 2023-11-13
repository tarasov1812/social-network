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
    currentUser: {
      nickName: '@burtovoy',
      name: 'Alexandr',
      avatar: 'https://ucarecdn.com/360f60a2-a4d1-47c4-89f8-09f7181d6619/-/preview/500x500/-/quality/smart/-/format/auto/',
      location: 'Volgograd',
      aboutMe: 'Entrepreneur and mentor in programming',
      webSite: 'burtovoy.org',
      birthDate: '14.06.1946',
      visibility: 'Show everyone',
      email: 'burtovoy@gmail.com',
    },
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

export const { setPosts, createPost, setCurrentUser } = postSlice.actions;
export default postSlice.reducer;
