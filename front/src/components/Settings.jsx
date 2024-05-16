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
                <NavLink to="/app/settings/profile-settings"
                         className={(initialPath.startsWith('/app/settings/profile-settings') || initialPath === '/app/settings') ? styles.active : ''}>Profile
                    Settings</NavLink>
                <NavLink to="/app/settings/change-password"
                         className={initialPath === '/app/settings/change-password' ? styles.active : ''}>Change
                    password</NavLink>
                <NavLink to="/app/settings/change-email"
                         className={initialPath === '/app/settings/change-email' ? styles.active : ''}>Change
                    email</NavLink>
                <NavLink to="/app/settings/background"
                         className={initialPath === '/app/settings/background' ? styles.active : ''}>Background</NavLink>
                <NavLink to="/app/settings/upload-cv"
                         className={initialPath === '/app/settings/upload-cv' ? styles.active : ''}>Upload CV</NavLink>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Settings;
