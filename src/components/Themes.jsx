import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Themes.module.css';
import Theme from './Theme.jsx';

function Themes() {
  const themes = useSelector((state) => state.posts.themes);
  return (
    <div className={styles.container}>
      <h4>Relevat topics</h4>
      {themes.map((theme) => (
        <Theme key={theme.key} tag={theme.tag} messages={theme.messages} />
      ))}
    </div>
  );
}

export default Themes;
