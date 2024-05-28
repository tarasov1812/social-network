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
        const file = event.target.files[0];
        setSelectedFile(file);

    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }
        if (selectedFile.type !== 'application/pdf') {
            console.error('Only PDF files are allowed');
            return;
        }
        dispatch(uploadCV({ id: currentUser.id, file: selectedFile }));
        alert('CV was uploaded');
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
                <br/>
                <button className={styles.button} type="button" onClick={handleFileUpload}>Upload</button>
                <input
                    className={styles.inputHidden}
                />
            </div>
        </div>
    );
}

export default UploadCV;
