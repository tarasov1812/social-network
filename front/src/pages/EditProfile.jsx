import * as LR from '@uploadcare/blocks';
import fileUploaderRegularCssSrc from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileDate, setCurrentUser } from '../store/CurrentUserSlice.js';
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
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const [photoUrl, setPhotoUrl] = useState('');
  const [name, setName] = useState(currentUser.name);
  const [nick, setNick] = useState(currentUser.nickName ? currentUser.nickName.slice(1) : '');
  const [about, setAbout] = useState(currentUser.about);
  const [location, setLocation] = useState(currentUser.location);
  const [stack, setStack] = useState(currentUser.stack);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate ? currentUser.birthdate.split('T')[0] : '');
  const [showBirthdate, setShowbirthdate] = useState('not settled');
  const [openToWork, setOpenToWork] = useState('not settled');

  let backgroundStyle = {
    backgroundImage: `url(${photoUrl || currentUser.avatar})`,
  };

  const handlePhotoUpload = useCallback((e) => {
    const { data } = e.detail;
    if (data && data.length > 0 && data[0].cdnUrl) {
      setPhotoUrl(data[0].cdnUrl);
      backgroundStyle = {
        backgroundImage: `url(${photoUrl})`,
      };
    }
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
      nickName: nick ? `@${nick}` : currentUser.nickName,
      name: name || currentUser.name,
      avatar: photoUrl || currentUser.avatar,
      about: about || currentUser.about,
      location: location || currentUser.location,
      stack: stack || currentUser.stack,
      birthdate: birthdate ? new Date(`${birthdate}T00:00:00.000Z`).toISOString() : currentUser.birthdate,
      showBirthdate: showBirthdate === 'not settled' ? currentUser.showBirthdate : showBirthdate,
      openToWork: openToWork === 'not settled' ? currentUser.openToWork : openToWork,
    };

    const newUserData = {
      id: currentUser.id,
      nickName: nick ? `@${nick}` : currentUser.nickName,
      name: name || currentUser.name,
      avatar: photoUrl || currentUser.avatar,
      about: about || currentUser.about,
      stack: stack || currentUser.stack,
      location: location || currentUser.location,
      birthdate: birthdate ? new Date(`${birthdate}T00:00:00.000Z`).toISOString() : currentUser.birthdate,
      showBirthdate: showBirthdate === 'not settled' ? currentUser.showBirthdate : showBirthdate,
      openToWork: openToWork === 'not settled' ? currentUser.openToWork : openToWork,
    };

    dispatch(changeProfileDate({ id, requestBody }))
      .then((response) => {
        dispatch(setCurrentUser(newUserData));
        alert('Your profile has been updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <div className={styles.form}>
        <div className={styles.nameNickFoto}>
          <div className={styles.nameNick}>
            <span className={styles.nameSpan}>Your name</span>
            <input className={styles.input} type="text" name="name" defaultValue={currentUser.name}
                   onChange={(e) => setName(e.target.value)}/>
            <span className={styles.nickSpan}>Your nick</span>
            <input className={styles.input} type="text" name="nick"
                   defaultValue={currentUser.nickName ? currentUser.nickName.slice(1) : ''}
                   onChange={(e) => setNick(e.target.value)}/>
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
        <textarea className={styles.aboutMe} type="text" name="about" defaultValue={currentUser.about}
                  onChange={(e) => setAbout(e.target.value)}/>
        <span className={styles.nickSpan}>Technological stack</span>
        <input className={styles.input} type="text" name="stack" defaultValue={currentUser.stack}
               onChange={(e) => setStack(e.target.value)}/>
        <span className={styles.nickSpan}>Location</span>
        <input className={styles.input} type="text" name="location" defaultValue={currentUser.location}
               onChange={(e) => setLocation(e.target.value)}/>
        <div className={styles.dateAndPermission}>
          <div>
            <span className={styles.nameSpan}>Date of birth</span>
            <input className={styles.inputBirth} type="date" name="date"
                   defaultValue={currentUser.birthdate ? currentUser.birthdate.split('T')[0] : ''}
                   onChange={(e) => setBirthdate(e.target.value)}/>
          </div>
          <div className={styles.checkB}>
            <span className={styles.birth}>Show birthdate</span>
            <input
                className={styles.inputConfirm}
                type="checkbox"
                name="showbd"
                checked={showBirthdate === 'not settled' ? currentUser.showBirthdate : showBirthdate}
                // checked={showbirthdate}
                onChange={(e) => setShowbirthdate(e.target.checked)}
            />
          </div>
          <div className={styles.checkOpenToWork}>
            <span className={styles.birth}>Open to work</span>
            <input
                className={styles.inputConfirm}
                type="checkbox"
                name="showbd"
                checked={openToWork === 'not settled' ? currentUser.openToWork : openToWork}
                // checked={showbirthdate}
                onChange={(e) => setOpenToWork(e.target.checked)}
            />
          </div>
        </div>
        <button className={styles.button} type="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
