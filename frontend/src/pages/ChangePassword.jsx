import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../store/CurrentUserSlice.js';
import styles from '../styles/ChangePassword.module.css';

function ChangePassword() {
  console.log('!');
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const passwordChanged = useSelector((state) => state.currentUser.passwordChanged);
  const { id } = currentUser;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  if (passwordChanged) {
    alert('Password was changed');
  }

  const handleSave = () => {
    if (newPassword === repeatPassword) {
      dispatch(changePassword({ id, oldPassword, newPassword }));
      // reset values after saving
      setOldPassword('');
      setNewPassword('');
      setRepeatPassword('');
    } else {
      alert('The entered passwords do not match');
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
