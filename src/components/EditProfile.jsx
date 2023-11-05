import * as LR from '@uploadcare/blocks';
import fileUploaderRegularCssSrc from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/EditProfile.module.css';

LR.FileUploaderRegular.shadowStyles = /* CSS */ `
  :host lr-simple-btn button {
    width: 25px;
    height: 21px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  :host lr-simple-btn button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  :host lr-simple-btn svg {
    display: none;
  }

  :host lr-simple-btn button span {
    display: none;
  }

  :host .lr-uploadcare-widget-header-logo {
    display: none;
  }

  :host {
    margin: 0 auto;
    width: 25px;
    height: 21px;
    background-image: url('/img/foto-settings.svg');
    background-size: cover;
  }
`;

LR.registerBlocks(LR);

function EditProfile() {
  const dataOutputRef = useRef();
  const currentUser = useSelector((state) => state.posts.currentUser);
  const [photoUrl, setPhotoUrl] = useState(currentUser.avatar);

  const backgroundStyle = {
    backgroundImage: `url(${photoUrl})`,
  };

  const handlePhotoUpload = useCallback((e) => {
    const { data } = e.detail;
    setPhotoUrl(data[0].cdnUrl);
  }, []);

  useEffect(() => {
    const el = dataOutputRef.current;

    if (el) {
      el.addEventListener('lr-data-output', handlePhotoUpload);
    }

    return () => {
      if (el) {
        el.removeEventListener('lr-data-output', handlePhotoUpload);
      }
    };
  }, [handlePhotoUpload]);

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <div className={styles.form}>
        <div className={styles.nameNickFoto}>
          <div className={styles.nameNick}>
            <span className={styles.nameSpan}>Your name</span>
            <input className={styles.input} type="text" name="name" defaultValue={currentUser.name} />
            <span className={styles.nickSpan}>Your nick</span>
            <input className={styles.input} type="text" name="nick" defaultValue={currentUser.nickName} />
            {/* <div className={styles.invalid}>The field should not be empty</div> */}
          </div>
          <div className={styles.profileFoto} style={backgroundStyle}>
            <lr-config
              ctx-name="my-uploader"
              pubkey="3840ea5c2fc14f7bb59a"
            />
            <lr-data-output
              ref={dataOutputRef}
              use-event
              hidden
              class="uploader-cfg"
              onEvent={handlePhotoUpload}
              ctx-name="my-uploader"
            />
            <lr-file-uploader-regular
              ctx-name="my-uploader"
              css-src={fileUploaderRegularCssSrc}
            />
          </div>
        </div>
        <span className={styles.aboutMeSpan}>About me</span>
        <textarea className={styles.aboutMe} type="text" name="nick" defaultValue={currentUser.aboutMe} />
        <span className={styles.nickSpan}>Location</span>
        <input className={styles.input} type="text" name="nick" defaultValue={currentUser.location} />
        <div className={styles.dateAndPermission}>
          <div>
            <span className={styles.nameSpan}>Date of birth</span>
            <input className={styles.inputBirth} type="text" name="name" defaultValue={currentUser.birthDate} />
          </div>
          <div>
            <span className={styles.nickSpan}>Show date of birth</span>
            <input className={styles.inputConfirm} type="text" name="nick" defaultValue={currentUser.visibility} />
          </div>
        </div>
        <button className={styles.button} type="button">Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
