import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadCV } from '../store/CurrentUserSlice.js';
import styles from '../styles/UploadCV.module.css';

function UploadCV() {
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
            <h2>Upload CV</h2>
            <div className={styles.form}>
                <input
                    className={styles.input}
                    type="file"
                    name="cv"
                    onChange={handleSelectFile}
                />
                <button className={styles.button} type="button" onClick={handleFileUpload}>Upload</button>
            </div>
        </div>
    );
}

export default UploadCV;
