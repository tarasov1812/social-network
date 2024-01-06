import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { subscribeUser, unsubscribeUser, fetchUser } from '../store/CurrentUserSlice.js';
import { fetchUserDetails } from '../store/DifferentUserSlice.js';
import styles from '../styles/Subscriber.module.css';

function Subscriber({ userToViewData, data, customKey }) {
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState(data.issubscribed);

  useEffect(() => {
    if (data.issubscribed !== undefined) {
      setSubscribed(data.issubscribed);
    }
  }, [data.issubscribed]);

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const showSubscribeButton = data.id !== undefined
  && currentUser.nickname !== data.nickname;
  const handleButtonClick = () => {
    const currentUserId = currentUser.id;
    let id;
    if (typeof userToViewData === 'object' && userToViewData !== null && Object.keys(userToViewData).length > 0) {
      id = userToViewData.id.toString();
    } else {
      id = currentUser.id.toString();
    }
    
    if (subscribed) {
      dispatch(unsubscribeUser(currentUser.id, data.id))
        .then(() => {
          dispatch(fetchUserDetails({ id, currentUserId }));
          dispatch(fetchUser());
        })
        .catch((error) => {
          console.log(error);
        });
      setSubscribed(false);
    } else {
      dispatch(subscribeUser(currentUser.id, data.id))
        .then(() => {
          dispatch(fetchUserDetails({ id, currentUserId }));
          dispatch(fetchUser());
        })
        .catch((error) => {
          console.log(error);
        });
      setSubscribed(true);
    }
  };

  return (
    <div className={styles.postAll} key={customKey}>
      <Link to={`/app/profile/${data.id}`} id="postLink1"><img className={styles.avatar} src={data.avatar} alt="User Avatar" /></Link>
      <div className={styles.post}>
        <div className={styles.nickNameDate}>
          <div className={styles.nameNick}>
            <span className={styles.name}><Link to={`/app/profile/${data.id}`} id="postLink1">{data.name}</Link></span>
            <span className={styles.nick}><Link to={`/app/profile/${data.id}`} id="postLink2">{data.nickname}</Link></span>
          </div>
        </div>
        <div className={styles.message}>
          <p>
            {data.about}
          </p>
        </div>
      </div>
      {!showSubscribeButton ? null : (
        <button
          type="button"
          className={subscribed ? styles.subscribed : styles.unSubscribed}
          onClick={handleButtonClick}
        >
          {subscribed ? 'Unsubscribe' : 'Subscribe'}

        </button>
      )}
    </div>
  );
}

export default Subscriber;
