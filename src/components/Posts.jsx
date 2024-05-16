import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post.jsx';
import styles from '../styles/Posts.module.css';

function Posts({ postsToView }) {
  const messages = useSelector((state) => state.currentUser.data);
  const isLoadingCurrentUser = useSelector((state) => state.currentUser.isLoading);

  if (isLoadingCurrentUser) {
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
      {(postsToView || messages).map((message) => (
        <Post data={message} key={message.id}/>
      ))}
    </div>
  );
}

export default Posts;
