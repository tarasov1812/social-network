import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeEmail } from '../store/CurrentUserSlice.js';
import styles from '../styles/ChangeEmail.module.css';

function ChangeEmail() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const { id } = currentUser;

  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    dispatch(changeEmail({ id, password, email: newEmail }));
    // Reset values after saving
    setNewEmail('');
    setPassword('');
    alert('Email was changed');
  };
  return (
    <div className={styles.container}>
      <h2>Edit Email</h2>
      <div className={styles.form}>
        <span className={styles.span}>New email</span>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <span className={styles.span}>Password for confirmation</span>
        <input
          className={styles.input}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default ChangeEmail;
