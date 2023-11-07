import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from '../styles/Settings.module.css';

function Settings() {
  return (
    <div className={styles.settings}>
      <nav className={styles.nav} id="setting-nav">
        <span className={styles.header}>Settings</span>
        <NavLink to="/app/settings/profile-settings">Profile Settings</NavLink>
        <NavLink to="/app/settings/change-password">Change password</NavLink>
        <NavLink to="/app/settings/change-email">Change email</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Settings;
