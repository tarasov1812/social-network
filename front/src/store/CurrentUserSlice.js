import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    data: [],
    themes: [],
    channels: [],
    currentUser: {},
    isLoadingCurrentUser: true,
    passwordChanged: false,
  },
  reducers: {
    setPosts: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    createPost: (state, action) => ({
      ...state,
      data: [action.payload, ...state.data],
    }),
    setCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemes.fulfilled, (state, action) => ({
        ...state,
        themes: action.payload
      }))
      .addCase(fetchChannels.fulfilled, (state, action) => ({
        ...state,
        channels: action.payload,
      }))
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        currentUser: action.payload.userDetails,
        data: action.payload.posts,
        isLoadingCurrentUser: false,
      }))
       .addCase(changePassword.fulfilled, (state, action) => ({
           ...state,
           passwordChanged: true,
      }));
  },
});

export const fetchThemes = createAsyncThunk('posts/fetchThemes', async () => {
    const response = await axios.get('/api/tags');
    return response.data.tags;
  });
  
export const fetchChannels = createAsyncThunk('posts/fetchChannels', async () => {
    const response = await axios.get('/api/channels');
    return response.data.channels;
  });
  
export const fetchUser = createAsyncThunk('posts/fetchUser', async () => {
    try {
        const response = await axios.get('/api/feed');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log(error.status);
            window.location.href = '/login/';
        } else {
            console.log('An unexpected error occurred');
        }
        throw error;
    }
  });

    export const createPostAsync = createAsyncThunk(
  'posts/createPost',
  async (requestBody) => {
    const response = await axios.post('/api/createPost', requestBody, {
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
    const response = await axios.put(`/api/update/${id}`, requestBody, {
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
    const response = await axios.put(`/api/changePassword/${id}`, {
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
    const response = await axios.put(`/api/changeEmail/${id}`, {
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

export const changeBackground = createAsyncThunk(
    'user/changeBackground',
    async ({id, background}) => {
        const response = await axios.put(`/api/uploadBackground/${id}`, {
            background,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },
);

export const uploadCV = createAsyncThunk(
    'user/uploadCV',
    async ({ id, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        const response = await axios.post(`/api/uploadCV/${id}`, formData, {
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },
);

// unsubcribe
export const unsubscribeUser = (subscriberId, subscribedToId) => async () => {
  try {
    const response = await axios.delete('/api/unsubscribe', {
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
    const response = await axios.post('/api/subscribe', {
      subscriberId,
      subscribedToId,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Subscription error:', error);
  }
};

export const { setPosts, createPost, setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
