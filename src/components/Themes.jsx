import React, { useState, useEffect } from 'react';
import styles from '../styles/Themes.module.css';
import Theme from './Theme.jsx';

function Themes() {
  const [themes, setThemes] = useState([]);
  const messageToShow = 5;

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setThemes(data.topics.slice(0, messageToShow));
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className={styles.container}>
      <h4>Relevat topics</h4>
      {themes.map((theme) => (
        <Theme tag={theme.tag} messages={theme.messages} />
      ))}
    </div>
  );
}

export default Themes;
