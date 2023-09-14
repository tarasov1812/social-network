import React from 'react';
import styles from '../styles/CreateMessage.module.css';

function CreateMessage({ setActive, active }) {
  if (!active) {
    return (
      <div className={styles.stylus} onClick={() => setActive(!active)}>
        <p className={styles.message}>What's new, Alexandr?</p>
      </div>
    );
  }
}

export default CreateMessage;
