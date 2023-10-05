import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Post.module.css';
import timeConverter from '/public/assets/time_converter.js';

function Post({ pictures }) {
  const data = useSelector(state => state.posts.data);
  const currentTime = new Date();
  const picture = pictures ? pictures.find((par) => par.messageId === data.id) : null;
  const pictureUrl = picture ? picture.urlAvatar : '';
  const postPictureUrl = picture ? picture.urlMessagePic : '';

  let date = timeConverter(Math.floor((currentTime - new Date(data.time)) / 1000 / 60));
  // put string 'age' if date is not 'now'
  let ago = '\u00A0ago';
  // if date is not 'now' cat 'ago' string from return from function timeConverter
  // and put ago string at the next span
  // if date is 'now' - don't put 'ago' at the next span
  if (date.includes('ago')) {
    date = date.substring(0, date.length - 3);
  } else {
    ago = '';
  }

  return (
    <div className={styles.postAll}>
      <img className={styles.avatar} src={pictureUrl} alt="User Avatar" />
      <div className={styles.post}>
        <div className={styles.nickNameDate}>
          <div className={styles.nameNick}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.nick}>{data.nickname}</span>
          </div>
          <div className={styles.date}>
            <span>{date}</span>
            <span>{ago}</span>
          </div>
        </div>
        <div className={styles.message}>
          <p>{data.content}</p>
          {postPictureUrl && <img className={styles.attachedPicture} src={postPictureUrl} alt="AttachedPicture" />}
        </div>
        <div className={styles.counters}>
          <div className={styles.repost}>
            <img src="../../img/repost.svg" alt="Repost Icon" />
            <span>{data.reposts}</span>
          </div>
          <div>
            <img src="../../img/like.svg" alt="Like Icon" />
            <span>{data.likes}</span>
          </div>
          <div>
            <img src="../../img/share.svg" alt="Share Icon" />
            <span>{data.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
