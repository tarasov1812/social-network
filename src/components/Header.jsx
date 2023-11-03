import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <>
      <nav id="container" className={styles.container}>
        <div className={styles.home} />
        <NavLink to="/app/feed">Feed</NavLink>
        <div className={styles.profile} />
        <NavLink to="/app/profile">Profile</NavLink>
        <div className={styles.settings} />
        <NavLink to="/app/settings">Settings</NavLink>
        <div className={styles.logo} />
        <div className={styles.avatar} />
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
