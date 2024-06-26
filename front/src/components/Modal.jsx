import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget } from '@uploadcare/react-widget';
import styles from '../styles/Modal.module.css';
import postSize from '/public/assets/post_size.js';
import lightHashtag from '/public/assets/light_hashtag.js';
import Circle from './Circle.jsx';
import { createPost, createPostAsync } from '../store/CurrentUserSlice.js';

function Modal({ active, setActive }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
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

  const close = () => {
    setActive(false);
  }

  const handlePost = () => {
    const authorId = currentUser.id;

    const requestBody = {
      authorId: authorId,
      content: message,
      postDate: new Date().toISOString().slice(0, -5),
      thumbUp: 0,
      repost: 0,
      share: 0,
      img: photoUrl,
    };

    const newPost = {
      id: Math.random(),
      authorId: authorId,
      authorAvatar: currentUser.avatar,
      name: currentUser.name,
      nickName: currentUser.nickName,
      content: message,
      postDate: new Date().toISOString().slice(0, -5),
      thumbUp: 0,
      repost: 0,
      share: 0,
      img: photoUrl,
    };

    dispatch(createPostAsync(requestBody))
      .then((response) => {
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
          <div className={styles.content}><span className={styles.close} onClick={close}>&times;</span>
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
