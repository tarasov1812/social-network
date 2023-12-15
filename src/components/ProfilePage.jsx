import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from './Logo.jsx';
import Posts from './Posts.jsx';
import Themes from './Themes.jsx';
import Recomendations from './Recomendations.jsx';
import ProfilePageBanner from './ProfilePageBanner.jsx';

function ProfilePage() {
  const { id } = useParams();
  const parsedId = parseInt(id, 10);
  let userToViewData = {};
  const postsToView = [];
  // if (parsedId) {
  //   const dispatch = useDispatch();
  //   const userId = parsedId;
  //   dispatch(fetchPostsWithUserId({ userId }))
  //     .then((response) => {
  //       postsToView = postsToView.concat(response.payload);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // const postsWithId = useSelector((state) => state.posts.postsWithId);

  const allMessages = useSelector((state) => state.posts.data);
  const currentUser = useSelector((state) => state.posts.currentUser);
  if (currentUser.id !== parsedId) {
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === parsedId) {
        userToViewData = allMessages[i];
        postsToView.push(allMessages[i]);
      }
    }
  } else {
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }
  if (Number.isNaN(parsedId)) {
    for (let i = 0; i < allMessages.length; i += 1) {
      if (allMessages[i].author_id === currentUser.id) {
        postsToView.push(allMessages[i]);
      }
    }
  }

  return (
    <>
      <Logo />
      <div className="content">
        <div>
          <ProfilePageBanner userToViewData={userToViewData} />
          <Posts postsToView={postsToView} />
        </div>
        <div>
          <Themes />
          <Recomendations />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
