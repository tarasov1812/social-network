import React from 'react';
import styles from '../styles/ChangePassword.module.css';

function ChangePassword() {
  return (
    <div className={styles.container}>
      <h2>Edit Password</h2>
      <div className={styles.form}>
        <span className={styles.nickSpan}>Old password</span>
        <input className={styles.location} type="text" name="nick" />
        <span className={styles.nickSpan}>New password</span>
        <input className={styles.location} type="text" name="nick" />
        <span className={styles.nickSpan}>Repeat new password</span>
        <input className={styles.location} type="text" name="nick" />
        <button className={styles.button} type="button">Save</button>
      </div>
    </div>

  );
}

export default ChangePassword;
