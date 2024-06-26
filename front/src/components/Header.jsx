import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../styles/Header.module.css";

function Header() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  let backgroundStyle = {};
  if (currentUser && currentUser.avatar) {
    backgroundStyle = {
      backgroundImage: `url(${currentUser.avatar})`,
    };
  }

  return (
    <>
      <nav id="container" className={styles.container}>
        <NavLink to="/feed" id="link1">
          <div className={styles.home} />
          <p>Feed</p>
        </NavLink>
        <NavLink to={`/profile/${currentUser.id}`} id="link1">
          <div className={styles.profile} />
          <p>Profile</p>
        </NavLink>
        <NavLink to="/settings" id="link1">
          <div className={styles.settings} />
          <p>Settings</p>
        </NavLink>
        <div className={styles.logo} />
        <NavLink to={`/profile/${currentUser.id}`}>
          <div className={styles.avatar} style={backgroundStyle} />
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
