import React from 'react';
import { useSelector } from 'react-redux';
import Subscriber from './Subscriber.jsx';
import styles from '../styles/Subscribers.module.css';

function Subscribers({ userToViewData, subscribersToShowProps, subscribedToShowProps }) {
  const nonEmptyArray = subscribedToShowProps.length > 0
    ? subscribedToShowProps : subscribersToShowProps;
  const userDetailsLoading = useSelector((state) => state.differentUser.userDetailsLoading);

  if (userDetailsLoading) {
    const elements = [];

    for (let i = 0; i < 5; i += 1) {
      elements.push(
        <div className={styles.allPosts} key={i}>
          <div className={styles.postAll}>
            <div className={styles.avatarGray} />
            <div className={styles.post}>
              <div className={styles.nickNameDate}>
                <div className={styles.grayNickName}>
                  <span className={styles.grayName} />
                  <span className={styles.grayNick} />
                </div>
              </div>
              <div className={styles.grayMessage}>
                <p />
                <p />
              </div>
            </div>
          </div>
          <div className={styles.graySpace} />
        </div>,
      );
    }

    return <div>{elements}</div>;
  }
  return (
    <div className={styles.allPosts}>
      {nonEmptyArray.map((subscriber) => (
        <Subscriber userToViewData={userToViewData} data={subscriber} key={subscriber.id}/>
      ))}
    </div>
  );
}

export default Subscribers;
