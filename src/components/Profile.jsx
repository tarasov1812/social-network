import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Profile.module.css';

function Profile() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const backgroundStyle = {
    backgroundImage: `url(${currentUser.avatar})`,
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo} />
      <div className={styles.profileFoto} style={backgroundStyle} />
      <div className={styles.profileName}>
        <span className={styles.name}>{currentUser.name}</span>
        <br />
        <span className={styles.nickName}>{6}</span>
      </div>
      <div className={styles.statistic}>
        <div className={styles.statisticData}>
          <span className={styles.number}>{6}</span>
          <br />
          <span className={styles.word}>Messages</span>
        </div>
        <div className={styles.statisticData}>
          <span className={styles.number}>{6}</span>
          <br />
          <span className={styles.word}>Following</span>
        </div>
        <div className={styles.statisticData}>
          <span className={styles.number}>{currentUser.followers_count}</span>
          <br />
          <span className={styles.word}>Followers</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
