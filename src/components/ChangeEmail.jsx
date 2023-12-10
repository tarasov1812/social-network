import React from 'react';
import styles from '../styles/ChangeEmail.module.css';

function ChangeEmail() {
  return (
    <div className={styles.container}>
      <h2>Edit Email</h2>
      <div className={styles.form}>
        <span className={styles.span}>New email</span>
        <input className={styles.input} type="email" name="email" />
        <span className={styles.span}>Password for confirmation</span>
        <input className={styles.input} type="password" name="password" />
        <button className={styles.button} type="button">Save</button>
      </div>
    </div>
  );
}

export default ChangeEmail;
