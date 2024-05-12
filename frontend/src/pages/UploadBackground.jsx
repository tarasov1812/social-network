import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/UploadCV.module.css';
import {Widget} from "@uploadcare/react-widget";

function UploadBackground() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.currentUser);
    const { id } = currentUser;

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSelectFile = () => {
        const file = event.target.files[0]; // Get the selected file from the input
        setSelectedFile(file); // Update selectedFile state

    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }
        dispatch(uploadCV({ id: currentUser.id, file: selectedFile }));
    };

    return (
        <div className={styles.container}>
            <h2>Background</h2>
            <div className={styles.form}>
                <button className={styles.button} type="button" onClick={handleFileUpload}>Upload</button>
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
                />
            </div>
        </div>
    );
}

export default UploadBackground;
