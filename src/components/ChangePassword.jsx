import React from 'react';
import styles from '../styles/ChangePassword.module.css';

function ChangePassword() {
  return (
    <div className={styles.container}>
      <h2>Edit Password</h2>
      <div className={styles.form}>
        <span className={styles.span}>Old password</span>
        <input className={styles.input} type="password" name="nick" />
        <span className={styles.span}>New password</span>
        <input className={styles.input} type="password" name="nick" />
        <span className={styles.span}>Repeat new password</span>
        <input className={styles.input} type="password" name="nick" />
        <button className={styles.button} type="button">Save</button>
      </div>
    </div>

  );
}

export default ChangePassword;
