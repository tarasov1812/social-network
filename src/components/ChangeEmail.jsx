import React from 'react';
import styles from '../styles/ChangeEmail.module.css';

function ChangeEmail() {
  return (
    <div className={styles.container}>
      <h2>Edit Email</h2>
      <div className={styles.form}>
        <span className={styles.nickSpan}>New Email</span>
        <input className={styles.location} type="text" name="nick" />
        <span className={styles.nickSpan}>Password</span>
        <input className={styles.location} type="password" name="nick" />
        <button className={styles.button} type="button">Save</button>
      </div>
    </div>
  );
}

export default ChangeEmail;
