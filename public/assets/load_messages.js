/**
 * Function for loading latest post of the main page
 */

import timeConverter from './time_converter.js';
import messageHTML from './messageHTML.js';

const grayMessages = document.getElementById('gray-messages');
const currentTime = new Date();

const loadMessages = async () => {
  // eslint-disable-next-line no-undef
  const response = await axios.get('http://localhost:8086/app/findLatesPosts');
  response.data.forEach((message) => {
    console.log(message);
    const pictureUrl = message.img ? message.img : '';
    // get time difference from the post time and current time
    let date = timeConverter(Math.floor((currentTime - new Date(message.postDate)) / 1000 / 60));
    // put string 'age' if date is not 'now'
    let ago = '&nbspago';
    // if date is not 'now' cat 'ago' string from return from function timeConverter
    // and put ago string at the next span
    // if date is 'now' - don't put 'ago' at the next span
    if (date.includes('ago')) {
      date = date.substring(0, date.length - 3);
    } else {
      ago = '';
    }
    // call helper funtion for create HTML code
    const messageH = messageHTML(
      message.authorAvatar,
      message.authorName,
      message.authorNickName,
      date,
      ago,
      message.content,
      pictureUrl,
      message.repost,
      message.thumbUp,
      message.share,
      message.postDate,
    );

    grayMessages.classList.add('hidden');
    document.getElementById('all-posts-id').insertAdjacentHTML('beforeend', messageH);
  });
};

export default loadMessages;
