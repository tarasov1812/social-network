import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchThemes = createAsyncThunk('posts/fetchThemes', async () => {
  const response = await axios.get('/tags');
  return response.data.tags;
});

export const fetchChannels = createAsyncThunk('posts/fetchChannels', async () => {
  const response = await axios.get('/channels');
  return response.data.channels;
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

// get Subscribers
export const fetchSubscribers = createAsyncThunk(
  'user/fetchSubscribers',
  async ({ id, currentUserId }) => {
    try {
      const response = await axios.get(`/getSubscribers/${id}/${currentUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      throw error;
    }
  },
);

// get Subscribed
export const fetchSubscribed = createAsyncThunk(
  'user/fetchSubscribed',
  async ({ id, currentUserId }) => {
    try {
      const response = await axios.get(`/getSubscribed/${id}/${currentUserId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      throw error;
    }
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

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    postsFoundById: [],
    subscribers: [],
    subscribed: [],
    themes: [],
    channels: [],
    currentUser: {
    },
    userFoundById: {
    },
    isLoading: true,
    isLoadingCurrentUser: true,
    isLoadingPostsWithId: true,
    isLoadingUserWithId: true,
    isLoadingSubscribers: true,
    isLoadingSubscribed: true,
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
      .addCase(fetchSubscribers.fulfilled, (state, action) => ({
        ...state,
        subscribers: action.payload,
        isLoadingSubscribers: false,
      }))
      .addCase(fetchSubscribed.fulfilled, (state, action) => ({
        ...state,
        subscribed: action.payload,
        isLoadingSubscribed: false,
      }))
      .addCase(fetchUserInfoWithId.fulfilled, (state, action) => ({
        ...state,
        userFoundById: action.payload,
        isLoadingUserWithId: false,
      }))
      .addCase(fetchThemes.fulfilled, (state, action) => ({
        ...state,
        themes: action.payload,
      }))
      .addCase(fetchChannels.fulfilled, (state, action) => ({
        ...state,
        channels: action.payload,
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
