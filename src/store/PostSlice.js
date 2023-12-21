import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/posts.json');
  return response.data;
});

export const fetchCurrentUserPosts = createAsyncThunk(
  'posts/postUserAndSubs',
  async (userId) => {
    const response = await axios.get('/postUserAndSubs', {
      params: {
        userId,
      },
    });
    return response.data;
  },
);

export const fetchUserPostsWithId = createAsyncThunk(
  'posts/fetchUserPostsWithId',
  async ({ id }) => {
    const response = await axios.get(`/user-posts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

export const fetchUserInfoWithId = createAsyncThunk(
  'posts/fetchUserInfoWithId',
  async ({ id, currentUserId }) => {
    const response = await axios.get(`/get-user-with-id/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        currentUserId,
      },
    });
    return response.data;
  },
);

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

// unsubcribe
export const unsubscribeUser = (subscriberId, subscribedToId) => async () => {
  try {
    const response = await axios.delete('/unsubscribe', {
      data: { subscriberId, subscribedToId },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error unsubscribing:', error);
  }
};

// subscribe
export const subscribeUser = (subscriberId, subscribedToId) => async () => {
  try {
    const response = await axios.post('/subscribe', {
      subscriberId,
      subscribedToId,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Subscription error:', error);
  }
};

// for future using
export const profileView = createAsyncThunk(
  'user/profileView',
  async ({ id }) => {
    const response = await axios.get(`/profileView/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    postsFoundById: [],
    currentUser: {
    },
    userFoundById: {
    },
    isLoading: true,
    isLoadingCurrentUser: true,
    isLoadingPostsWithId: true,
    isLoadingUserWithId: true,
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
      .addCase(fetchCurrentUserPosts.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
        isLoading: false,
      }))
      .addCase(fetchUserPostsWithId.fulfilled, (state, action) => ({
        ...state,
        postsFoundById: action.payload,
        isLoadingPostsWithId: false,
      }))
      .addCase(fetchUserInfoWithId.fulfilled, (state, action) => ({
        ...state,
        userFoundById: action.payload,
        isLoadingUserWithId: false,
      }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      }))
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        currentUser: action.payload,
        isLoadingCurrentUser: false,
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

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ id, oldPassword, newPassword }) => {
    const response = await axios.put(`/changePassword/${id}`, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

export const changeEmail = createAsyncThunk(
  'user/changeEmail',
  async ({ id, password, email }) => {
    const response = await axios.put(`/changeEmail/${id}`, {
      password,
      email,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

export const { setPosts, createPost, setCurrentUser } = postSlice.actions;
export default postSlice.reducer;
