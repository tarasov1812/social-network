import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post.jsx';
import styles from '../styles/Posts.module.css';

function Posts() {
  const messages = useSelector((state) => state.posts.data);
  const [isLoading, setIsloading] = useState(true);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetch('/pictures.json')
      .then((response) => response.json())
      .then((picturesData) => {
        setPictures(picturesData.picturesMessage);
        setIsloading(false);
      })
      .catch((error) => console.error('Error loading images', error));
  }, []);

  if (isLoading) {
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
      {messages.map((message) => (
        <Post data={message} pictures={pictures} />
      ))}
    </div>
  );
}

export default Posts;
