import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {subscribeUser, unsubscribeUser, fetchUser} from '../store/CurrentUserSlice.js';
import {fetchUserDetails} from '../store/DifferentUserSlice.js';
import {downloadCV} from '../store/DifferentUserSlice.js';
import styles from '../styles/ProfilePageBanner.module.css';

function ProfilePageBanner({
                               userToViewData, onFollowersClick, onFollowingClick, onMessagesClick,
                           }) {
    const dispatch = useDispatch();
    const [subscribed, setSubscribed] = useState(userToViewData.isSubscribed);
    const currentUser = useSelector((state) => state.currentUser.currentUser);
    const downloadedCV = useSelector((state) => state.differentUser.downloadedCV);
    const backgroundStyle = {
        backgroundImage: `url(${userToViewData.avatar || currentUser.avatar})`,
    };
    const showSubscribeButton = userToViewData.id !== undefined
        && currentUser.id !== userToViewData.id;

    useEffect(() => {
        if (userToViewData.isSubscribed !== undefined) {
            console.log('!');
            setSubscribed(userToViewData.isSubscribed);
        }
    }, [userToViewData.isSubscribed]);

    const handleButtonClick = () => {
        const id = userToViewData.id;
        const currentUserId = currentUser.id;
        if (subscribed) {
            dispatch(unsubscribeUser(currentUser.id, userToViewData.id))
                .then(() => {
                    dispatch(fetchUser());
                    dispatch(fetchUserDetails({id, currentUserId}));
                })
                .catch((error) => {
                    console.log(error);
                });
            setSubscribed(false);
        } else {
            dispatch(subscribeUser(currentUser.id, userToViewData.id))
                .then(() => {
                    dispatch(fetchUser());
                    dispatch(fetchUserDetails({id, currentUserId}));
                })
                .catch((error) => {
                    console.log(error);
                });
            setSubscribed(true);
        }
    };

    const handleDownloadCV = () => {
        dispatch(downloadCV(userToViewData.id || currentUser.id))
            .then((response) => {
                // Create a blob object from the file data
                console.log(downloadedCV);
                const blob = new Blob([downloadedCV], {type: 'application/pdf'});
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'cv.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading CV:', error);
            });
    };

    let birthD = '';
    if (currentUser.birthdate !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        birthD = currentUser.birthdate.split('T')[0];
        if (userToViewData.birthdate !== undefined) {
            // eslint-disable-next-line prefer-destructuring
            birthD = userToViewData.birthdate.split('T')[0];
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}/>
            <div className={styles.background}/>
            <div className={styles.profileFoto} style={backgroundStyle}/>
            <div className={styles.statistic}>
                <div className={styles.statistic2}>
                    <div className={styles.statisticData} onClick={onMessagesClick}>
            <span className={styles.number}>
              {userToViewData.postCount
                  || currentUser.postCount}
            </span>
                        <br className={styles.br} id="br1"/>
                        <span className={styles.word}>Messages</span>
                    </div>
                    <div className={styles.statisticData} onClick={onFollowingClick}>
            <span className={styles.number}>
              {userToViewData.followingCount !== undefined && userToViewData.followingCount !== null
                  ? userToViewData.followingCount
                  : currentUser.followingCount !== undefined && currentUser.followingCount !== null
                      ? currentUser.followingCount
                      : 0}

            </span>
                        <br className={styles.br} id="br2"/>
                        <span className={styles.word}>Following</span>
                    </div>
                    <div className={styles.statisticData} onClick={onFollowersClick}>
            <span className={styles.number}>
              {userToViewData.followersCount !== undefined && userToViewData.followersCount !== 0
                  ? userToViewData.followersCount
                  : currentUser.followersCount !== undefined
                      ? currentUser.followersCount
                      : 0}

            </span>
                        <br className={styles.br} id="br3"/>
                        <span className={styles.word}>Followers</span>
                    </div>
                </div>
                {!showSubscribeButton ? null : (
                    <button
                        type="button"
                        className={subscribed ? styles.subscribed : styles.unSubscribed}
                        onClick={handleButtonClick}
                    >
                        {subscribed ? 'Unsubscribe' : 'Subscribe'}

                    </button>
                )}
            </div>
            <div className={styles.profileName}>
                <span className={styles.name}>{userToViewData.name || currentUser.name}</span>
                <span className={styles.nickName}>{userToViewData.nickName || currentUser.nickName}</span>
            </div>
            <p className={styles.about}>{userToViewData.about || currentUser.about}</p>
            <div className={styles.containerDates}>
                <div className={styles.date}>
                    <div className={styles.location}/>
                    <p>{userToViewData.location || currentUser.location}</p>
                </div>
                <div className={styles.date}>
                    <div className={styles.nick}/>
                    <p>{userToViewData.nickName || currentUser.nickName}</p>
                </div>
                <div className={styles.date}>
                    <div className={styles.birthday}/>
                    <p>{birthD}</p>
                </div>
            </div>
            <div className={styles.containerDates}>
                <div className={styles.date}>
                    <div className={styles.nick}/>
                    <p>{userToViewData.stack || currentUser.stack}</p>
                </div>
                <div className={styles.date}>
                    <button className={styles.cvButton} onClick={handleDownloadCV}></button>
                    <p> CV</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePageBanner;
