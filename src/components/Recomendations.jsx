import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from "react-router-dom";
import styles from '../styles/Recomendations.module.css';

function Recomendations() {
    const channels = useSelector((state) => state.currentUser.channels);

    return (
        <div className={styles.container}>
            <h4>Interesting channels</h4>
            {channels.map((item) => (
                <div className={styles.channel} key={item.id}>
                        <img className={styles.channelLogo} src={item.img} alt="Channel Logo"/>
                    <div className={styles.channelNameAndNick}>
                            <span className={styles.channelName}>{item.channelName}</span>
                            <span className={styles.channelNick}>{item.channelNick}</span>
                    </div>
                    <NavLink to={`/app/profile/${item.id}`}>
                        <button type="button" className={styles.read}>Read</button>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

export default Recomendations;
