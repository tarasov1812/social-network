import React from 'react';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.home} />
      <p>Feed</p>
      <div className={styles.profile} />
      <p>Profile</p>
      <div className={styles.settings} />
      <p>Settings</p>
      <div className={styles.logo} />
      <div className={styles.avatar} />
    </div>
  );
}

export default Header;
