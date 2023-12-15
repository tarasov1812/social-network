import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget } from '@uploadcare/react-widget';
import styles from '../styles/Modal.module.css';
import postSize from '/public/assets/post_size.js';
import Circle from './Circle.jsx';
import { createPost, createPostAsync } from '../store/PostSlice.js';

function Modal({ active, setActive }) {
  const currentUser = useSelector((state) => state.posts.currentUser);
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const dispatch = useDispatch();

  const handlePhotoUpload = (info) => {
    setPhotoUrl(info.cdnUrl);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // The maximum allowed number of characters is 140 and minimum 1
    if (inputValue.length <= 140 && inputValue.length > 0) {
      setMessage(inputValue);
    }
  };

  const handlePost = () => {
    const author_id = currentUser.id;

    const requestBody = {
      author_id,
      content: message,
      img: photoUrl,
    };

    const newPost = {
      id: Math.random(),
      author_id: author_id,
      avatar: currentUser.avatar,
      name: currentUser.name,
      nickname: currentUser.nickName,
      content: message,
      time: new Date().toISOString().slice(0, -5),
      likes: 0,
      reposts: 0,
      shares: 0,
      img: photoUrl,
    };

    dispatch(createPostAsync(requestBody))
      .then((response) => {
        console.log(response);
        setActive(false);
        dispatch(createPost(newPost));
      })
      .catch((error) => {
        console.error('Error posting:', error);
      });
  };

  if (active) {
    return (
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.line} />
          <div className={styles.content}>
            <textarea name="message" placeholder={`What is new, ${currentUser.name}?`} onChange={handleChange} className={styles.text} maxLength={140} />
            <div className={styles.buttons}>
              <div className={styles.counter}>
                <Circle amountOfSimbols={postSize(message)} />
              </div>
              <Widget
                localeTranslations={{
                  buttons: {
                    choose: {
                      files: {
                        one: '',
                      },
                    },
                  },
                }}
                publicKey="3840ea5c2fc14f7bb59a"
                onChange={handlePhotoUpload}
              />
              <button type="button" className={styles.send} onClick={handlePost}>Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
