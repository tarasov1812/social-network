import React from 'react';
import {useDispatch} from 'react-redux';
import {
    Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from 'react-router-dom';
import {
    fetchUser, fetchThemes, fetchChannels
} from './store/CurrentUserSlice.js';
import './App.css';

import Feed from './pages/Feed.jsx';
import Header from './components/Header.jsx';
import EditProfile from './pages/EditProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Settings from './components/Settings.jsx';
import ChangeEmail from './pages/ChangeEmail.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UploadCV from "./pages/UploadCV.jsx";
import UploadBackground from "./pages/UploadBackground.jsx";

const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Header/>}>
            <Route index element={<Feed/>}/>
            <Route path="feed" element={<Feed/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            <Route path="profile/:id" element={<ProfilePage/>}/>
            <Route path="author" element={<ProfilePage/>}/>
            <Route path="settings/" element={<Settings/>}>
                <Route index element={<EditProfile/>}/>
                <Route path="profile-settings" element={<EditProfile/>}/>
                <Route path="change-password" element={<ChangePassword/>}/>
                <Route path="change-email" element={<ChangeEmail/>}/>
                <Route path="background" element={<UploadBackground/>}/>
                <Route path="upload-cv" element={<UploadCV/>}/>
            </Route>
    </Route>,
));

function App() {
    const dispatch = useDispatch();
    dispatch(fetchUser());
    dispatch(fetchThemes());
    dispatch(fetchChannels());

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
