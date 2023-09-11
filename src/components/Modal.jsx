import React, { useState } from 'react';
import styles from '../styles/Modal.module.css';
import postSize from '/public/assets/post_size.js';

function Modal({ active, setActive }) {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const borderChangeColor = {
    borderColor: postSize(message) > 0 ? '#0057FF' : '#DFDFDF',
  };

  if (active) {
    return (
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.line} />
          <div className={styles.content}>
            <textarea name="message" placeholder="What is new Alexandr?" onChange={handleChange} className={styles.text} />
            <div className={styles.buttons}>
              <span type="button" className={styles.counter} style={borderChangeColor}>{postSize(message)}</span>
              <button type="button" className={styles.foto} />
              <button type="button" className={styles.send} onClick={() => setActive(false)}>Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
