import React, {useState, useEffect} from 'react';
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import styles from '../styles/Settings.module.css';

function Settings() {
    const location = useLocation();
    const [initialPath, setInitialPath] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        setInitialPath(currentPath);
    }, [location.pathname]);

    return (
        <div className={styles.settings}>
            <input className={styles.menu__toggle} type="checkbox" id="menu__toggle"/>
            <label className={styles.menu__btn} htmlFor="menu__toggle">
                <span/>
            </label>
            <nav className={styles.nav} id="setting-nav">
                <span className={styles.header}>Settings</span>
                <NavLink to="/settings/profile-settings"
                         className={(initialPath.startsWith('/settings/profile-settings') || initialPath === '/settings') ? styles.active : ''}>Profile
                    Settings</NavLink>
                <NavLink to="/settings/change-password"
                         className={initialPath === '/settings/change-password' ? styles.active : ''}>Change
                    password</NavLink>
                <NavLink to="/settings/change-email"
                         className={initialPath === '/settings/change-email' ? styles.active : ''}>Change
                    email</NavLink>
                <NavLink to="/settings/background"
                         className={initialPath === '/settings/background' ? styles.active : ''}>Background</NavLink>
                <NavLink to="/settings/upload-cv"
                         className={initialPath === '/settings/upload-cv' ? styles.active : ''}>Upload CV</NavLink>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Settings;
