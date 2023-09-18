import React, { useState } from 'react';
import styles from '../styles/Modal.module.css';
import postSize from '/public/assets/post_size.js';
import Circle from './Circle.jsx';

function Modal({ active, setActive }) {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // The maximum allowed number of characters is 140
    if (inputValue.length <= 140) {
      setMessage(inputValue);
    }
  };

  const handlePost = () => {
    const author_id = 1; // Set the appropriate author_id here

    const requestBody = {
      author_id,
      content: message,
    };

    fetch('/posts.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setActive(false);
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
            <textarea name="message" placeholder="What is new Alexandr?" onChange={handleChange} className={styles.text} maxLength={140} />
            <div className={styles.buttons}>
              <div className={styles.counter}>
                <Circle amountOfSimbols={postSize(message)} />
              </div>
              <button type="button" className={styles.foto} />
              <button type="button" className={styles.send} onClick={handlePost}>Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
