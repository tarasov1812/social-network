import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/UploadBackground.module.css';
import {Widget} from "@uploadcare/react-widget";
import {changeBackground } from "../store/CurrentUserSlice.js";

function UploadBackground() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.currentUser);
    const { id } = currentUser;

    const [photoUrl, setPhotoUrl] = useState('');
    const handlePhotoUpload = (info) => {
        setPhotoUrl(info.cdnUrl);
    };

    const handleBackgorund = () => {
        console.log()
        dispatch(changeBackground({ id, background: photoUrl }));
    };

    return (
        <div className={styles.container}>
            <h2>Background</h2>
            <div className={styles.form}>
                <span className={styles.empty}></span>
                <Widget
                    localeTranslations={{
                        buttons: {
                            choose: {
                                files: {
                                    one: '',
                                },
                            },
                        },
                    }}
                    publicKey="3840ea5c2fc14f7bb59a"
                    onChange={handlePhotoUpload}
                />
                <button className={styles.button} type="button" onClick={handleBackgorund}>Upload</button>
            </div>
        </div>
    );
}

export default UploadBackground;
