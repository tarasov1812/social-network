import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../store/PostSlice.js';
import styles from '../styles/ChangePassword.module.css';

function ChangePassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.posts.currentUser);
  const { id } = currentUser;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSave = () => {
    if (newPassword === repeatPassword) {
      dispatch(changePassword({ id, oldPassword, newPassword }));
      // reset values after saving
      setOldPassword('');
      setNewPassword('');
      setRepeatPassword('');
    } else {
      // modal than password is not the same
    }
  };
  return (
    <div className={styles.container}>
      <h2>Edit Password</h2>
      <div className={styles.form}>
        <span className={styles.span}>Old password</span>
        <input
          name="oldPassword"
          className={styles.input}
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <span className={styles.span}>New password</span>
        <input
          name="newPassword"
          className={styles.input}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <span className={styles.span}>Repeat new password</span>
        <input
          name="repeatNewPassword"
          className={styles.input}
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button className={styles.button} type="button" onClick={handleSave}>Save</button>
      </div>
    </div>

  );
}

export default ChangePassword;
