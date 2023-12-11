import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeUser, unsubscribeUser } from '../store/PostSlice.js';
import styles from '../styles/ProfilePageBanner.module.css';

function ProfilePageBanner({ userToViewData }) {
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState(true);
  const currentUser = useSelector((state) => state.posts.currentUser);
  const backgroundStyle = {
    backgroundImage: `url(${userToViewData.avatar || currentUser.avatar})`,
  };

  const handleButtonClick = () => {
    if (subscribed) {
      dispatch(unsubscribeUser(currentUser.id, userToViewData.author_id));
      setSubscribed(false);
    } else {
      dispatch(subscribeUser(currentUser.id, userToViewData.author_id));
      setSubscribed(true);
    }
  };

  let birthD = '';
  if (currentUser.birthdate !== undefined) {
    // eslint-disable-next-line prefer-destructuring
    birthD = currentUser.birthdate.split('T')[0];
    if (userToViewData.birthdate !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      birthD = userToViewData.birthdate.split('T')[0];
    }
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
            <br className={styles.br} id="br1" />
            <span className={styles.word}>Messages</span>
          </div>
          <div className={styles.statisticData}>
            <span className={styles.number}>28</span>
            <br className={styles.br} id="br2" />
            <span className={styles.word}>Following</span>
          </div>
          <div className={styles.statisticData}>
            <span className={styles.number}>6</span>
            <br className={styles.br} id="br3" />
            <span className={styles.word}>Followers</span>
          </div>
        </div>
        <button type="button" className={subscribed ? styles.subscribed : styles.unSubscribed} onClick={handleButtonClick}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
      </div>
      <div className={styles.profileName}>
        <span className={styles.name}>{userToViewData.name || currentUser.name}</span>
        <span className={styles.nickName}>{userToViewData.nickname || currentUser.nickname}</span>
      </div>
      <p className={styles.about}>{userToViewData.about || currentUser.about}</p>
      <div className={styles.containerDates}>
        <div className={styles.date}>
          <div className={styles.location} />
          <p>{userToViewData.location || currentUser.location}</p>
        </div>
        <div className={styles.date}>
          <div className={styles.nick} />
          <p>{userToViewData.nickname || currentUser.nickname}</p>
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
