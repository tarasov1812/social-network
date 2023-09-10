import React, { useState, useEffect } from 'react';
import styles from '../styles/Recomendations.module.css';

function Recomendations() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const channelsToShow = 3;

    const fetchData = async () => {
      const response = await fetch('./data.json');
      const data = await response.json();
      const blog = data.blogs;

      const picturesResponse = await fetch('./pictures.json');
      const pictures = await picturesResponse.json();

      const channelsData = blog.slice(0, channelsToShow).map((item) => {
        const picture = pictures.picturesChannel.find((par) => par.channelId === item.id);
        const pictureUrl = picture.url;

        return (
          <div className={styles.channel} key={item.id}>
            <img className={styles.channelLogo} src={pictureUrl} alt="Channel Logo" />
            <div className={styles.channelNameAndNick}>
              <span className={styles.channelName}>{item.channelName}</span>
              <span className={styles.channelNick}>{item.channelNick}</span>
            </div>
            <button type="button" className={styles.read}>Read</button>
          </div>
        );
      });

      setChannels(channelsData);
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <h4>Interesting channels</h4>
      {channels}
    </div>
  );
}

export default Recomendations;
