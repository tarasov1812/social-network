import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const differentUserSlice = createSlice({
    name: 'differentUser',
    initialState: {
        userInfo: {},
        subscribers: [],
        subscribed: [],
        postsFoundById: [],
        userDetailsLoading: true,
        downloadedCV: null,
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
            .addCase(downloadCV.fulfilled, (state, action) => ({
                ...state,
                downloadedCV: action.payload,
            }))
    },
});

export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async ({id, currentUserId}) => {
        try {
            const response = await axios.get(`/api/get-user-details/${id}/${currentUserId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }
);

export const downloadCV = createAsyncThunk(
    'user/downloadCV',
    async (authorId) => {
        const response = await axios.get(`/api/download-pdf/${authorId}`, {responseType: 'blob'});
        console.log(response.data);
        return response.data;
    }
);

export default differentUserSlice.reducer;
