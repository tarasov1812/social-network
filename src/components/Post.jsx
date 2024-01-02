import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Post.module.css';
import timeConverter from '/public/assets/time_converter.js';

function Post({ data, customKey }) {
  const currentTime = new Date();
  const postPictureUrl = data.img ? data.img : '';

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
    <div className={styles.postAll} key={customKey}>
      <Link to={`/app/profile/${data.author_id}`} id="postLink1"><img className={styles.avatar} src={data.avatar} alt="User Avatar" /></Link>
      <div className={styles.post}>
        <div className={styles.nickNameDate}>
          <div className={styles.nameNick}>
            <span className={styles.name}><Link to={`/app/profile/${data.author_id}`} id="postLink1">{data.name}</Link></span>
            <span className={styles.nick}><Link to={`/app/profile/${data.author_id}`} id="postLink2">{data.nickname}</Link></span>
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
