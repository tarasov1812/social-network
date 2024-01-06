import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/CreateMessage.module.css';

function CreateMessage({ setActive, active }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  if (!active) {
    return (
      <div className={styles.stylus} onClick={() => setActive(!active)}>
        <p className={styles.message}>What is new, {currentUser.name}?</p>
      </div>
    );
  }
}

export default CreateMessage;
