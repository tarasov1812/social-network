import React from 'react';
import styles from '../styles/Profile.module.css';

function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.logo} />
      <div className={styles.profileFoto} />
      <div className={styles.profileName}>
        <span className={styles.name}>Alexandr</span>
        <br />
        <span className={styles.nickName}>@burtovoy</span>
      </div>
      <div className={styles.statistic}>
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
    </div>
  );
}

export default Profile;
