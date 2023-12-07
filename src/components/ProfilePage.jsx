import React from 'react';
import '../App.css';

import Logo from './Logo.jsx';
import Posts from './Posts.jsx';
import Themes from './Themes.jsx';
import Recomendations from './Recomendations.jsx';
import ProfilePageBanner from './ProfilePageBanner.jsx';

function ProfilePage() {
  return (
    <>
      <Logo />
      <div className="content">
        <div>
          <ProfilePageBanner />
          <Posts />
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
