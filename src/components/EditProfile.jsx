import React from 'react';
import styles from '../styles/EditProfile.module.css';

function EditProfile() {
  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <div className={styles.form}>
        <div className={styles.nameNickFoto}>
          <div className={styles.nameNick}>
            <span className={styles.nameSpan}>Your name</span>
            <input className={styles.input} type="text" name="name" />
            <span className={styles.nickSpan}>Your nick</span>
            <input className={styles.input} type="text" name="nick" />
            {/* <div className={styles.invalid}>The field should not be empty</div> */}
          </div>
          <div className={styles.profileFoto}><div className={styles.photoSetting} /></div>
        </div>
        <span className={styles.aboutMeSpan}>About me</span>
        <textarea className={styles.aboutMe} type="text" name="nick" />
        <span className={styles.nickSpan}>Location</span>
        <input className={styles.location} type="text" name="nick" />
        <div className={styles.dateAndPermission}>
          <div>
            <span className={styles.nameSpan}>Date of birth</span>
            <input className={styles.input} type="text" name="name" />
          </div>
          <div>
            <span className={styles.nickSpan}>Show date of birth</span>
            <input className={styles.input} type="text" name="nick" />
          </div>
        </div>
        <button className={styles.button} type="button">Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
