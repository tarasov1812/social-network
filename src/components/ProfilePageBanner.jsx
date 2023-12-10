import React from 'react';
import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '../store/PostSlice.js';
import styles from '../styles/ProfilePageBanner.module.css';

function ProfilePageBanner() {
  const currentUser = useSelector((state) => state.posts.currentUser);
  const backgroundStyle = {
    backgroundImage: `url(${currentUser.avatar})`,
  };

  let birthD = '1993-02-18';
  if (currentUser.birthdate !== undefined) {
    // eslint-disable-next-line prefer-destructuring
    birthD = currentUser.birthdate.split('T')[0];
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo} />
      <div className={styles.background} />
      <div className={styles.profileFoto} style={backgroundStyle} />
      <div className={styles.statistic}>
        <div className={styles.statistic2}>
          <div className={styles.statisticData}>
            <span className={styles.number}>45K</span>
            <br />
            <span className={styles.word}>Messages</span>
          </div>
          <div className={styles.statisticData}>
            <span className={styles.number}>28</span>
            <br />
            <span className={styles.word}>Following</span>
          </div>
          <div className={styles.statisticData}>
            <span className={styles.number}>3</span>
            <br />
            <span className={styles.word}>Followers</span>
          </div>
        </div>
        <button type="button" className={styles.read}>Read</button>
      </div>
      <div className={styles.profileName}>
        <span className={styles.name}>{currentUser.name}</span>
        <span className={styles.nickName}>{currentUser.nickname}</span>
      </div>
      <p className={styles.about}>{currentUser.about}</p>
      <div className={styles.containerDates}>
        <div className={styles.date}>
          <div className={styles.location} />
          <p>{currentUser.location}</p>
        </div>
        <div className={styles.date}>
          <div className={styles.nick} />
          <p>{currentUser.nickname}</p>
        </div>
        <div className={styles.date}>
          <div className={styles.birthday} />
          <p>{birthD}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageBanner;
