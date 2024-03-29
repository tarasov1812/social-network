import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const differentUserSlice = createSlice({
  name: 'differentUser',
  initialState: {
    userInfo: {},
    subscribers: [],
    subscribed: [],
    postsFoundById: [],
    userDetailsLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => ({
        ...state,
        userDetailsLoading: false,
        userInfo: action.payload.userInfo,
        subscribers: action.payload.subscribers,
        subscribed: action.payload.subscribed,
        postsFoundById: action.payload.posts,
       }))
  },
});

export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async ({ id, currentUserId }) => {
      try {
        const response = await axios.get(`/get-user-details/${id}/${currentUserId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
      }
    }
  );

export default differentUserSlice.reducer;
