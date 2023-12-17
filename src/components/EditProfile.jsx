import * as LR from '@uploadcare/blocks';
import fileUploaderRegularCssSrc from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileDate, setCurrentUser } from '../store/PostSlice.js';
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
  const dispatch = useDispatch();
  const dataOutputRef = useRef();
  const currentUser = useSelector((state) => state.posts.currentUser);

  const [photoUrl, setPhotoUrl] = useState(currentUser.avatar);
  const [name, setName] = useState(currentUser.name);
  const [nick, setNick] = useState(currentUser.nickname ? currentUser.nickname.slice(1) : '');
  const [about, setAbout] = useState(currentUser.about);
  const [location, setLocation] = useState(currentUser.location);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate ? currentUser.birthdate.split('T')[0] : '');
  const [showbirthdate, setShowbirthdate] = useState('not settled');
  console.log(photoUrl);

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

  const handleSave = () => {
    const { id } = currentUser;

    const requestBody = {
      nickname: nick ? `@${nick}` : currentUser.nickname,
      name: name || currentUser.name,
      avatar: photoUrl || currentUser.avatar,
      about: about || currentUser.about,
      location: location || currentUser.location,
      birthdate: birthdate ? new Date(`${birthdate}T00:00:00.000Z`).toISOString() : currentUser.birthdate,
      showbirthdate: showbirthdate === 'not settled' ? currentUser.showbirthdate : showbirthdate,
    };

    const newUserData = {
      id: currentUser.id,
      nickname: nick ? `@${nick}` : currentUser.nickname,
      name: name || currentUser.name,
      avatar: photoUrl || currentUser.avatar,
      about: about || currentUser.about,
      location: location || currentUser.location,
      birthdate: birthdate ? new Date(`${birthdate}T00:00:00.000Z`).toISOString() : currentUser.birthdate,
      showbirthdate: showbirthdate === 'not settled' ? currentUser.showbirthdate : showbirthdate,
    };

    dispatch(changeProfileDate({ id, requestBody }))
      .then((response) => {
        console.log(response);
        dispatch(setCurrentUser(newUserData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backgroundStyle = {
    backgroundImage: `url(${photoUrl || currentUser.avatar})`,
  };

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <div className={styles.form}>
        <div className={styles.nameNickFoto}>
          <div className={styles.nameNick}>
            <span className={styles.nameSpan}>Your name</span>
            <input className={styles.input} type="text" name="name" defaultValue={currentUser.name} onChange={(e) => setName(e.target.value)} />
            <span className={styles.nickSpan}>Your nick</span>
            <input className={styles.input} type="text" name="nick" defaultValue={currentUser.nickname ? currentUser.nickname.slice(1) : ''} onChange={(e) => setNick(e.target.value)} />
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
        <textarea className={styles.aboutMe} type="text" name="about" defaultValue={currentUser.about} onChange={(e) => setAbout(e.target.value)} />
        <span className={styles.nickSpan}>Location</span>
        <input className={styles.input} type="text" name="location" defaultValue={currentUser.location} onChange={(e) => setLocation(e.target.value)} />
        <div className={styles.dateAndPermission}>
          <div>
            <span className={styles.nameSpan}>Date of birth</span>
            <input className={styles.inputBirth} type="date" name="date" defaultValue={currentUser.birthdate ? currentUser.birthdate.split('T')[0] : ''} onChange={(e) => setBirthdate(e.target.value)} />
          </div>
          <div className={styles.checkB}>
            <span className={styles.birth}>Show birthdate</span>
            <input
              className={styles.inputConfirm}
              type="checkbox"
              name="showbd"
              checked={showbirthdate === 'not settled' ? currentUser.showbirthdate : showbirthdate}
              // checked={showbirthdate}
              onChange={(e) => setShowbirthdate(e.target.checked)}
            />
          </div>
        </div>
        <button className={styles.button} type="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
