import modalValidateEmail from './modal_validate_email.js';
import modalValidateInput from './modal_validate_input.js';
import formValidation from './form_validation.js';
import timeConverter from './time_converter.js';
import modalValidateInputDataBase from './modale_validate_input_dataB.js';

// Validate email of the Registration form
const emailCheck = document.getElementById('email');

emailCheck.onblur = function () {
  modalValidateEmail('email', 'invalid-email', 'myModal');
};
emailCheck.oninput = function () {
  modalValidateEmail('email', 'invalid-email', 'myModal');
};

// Validate nick name of the Registration form
const nickName = document.getElementById('nick-name');
nickName.oninput = function () {
  modalValidateInput('nick-name', 'invalid-nick-name', 'myModal');
};
nickName.onblur = function () {
  modalValidateInput('nick-name', 'invalid-nick-name', 'myModal');
};

// Validate passwords of the Registration form
const pwd = document.getElementById('password');
const rPwd = document.getElementById('repeat-password');
pwd.oninput = function () {
  modalValidateInput('password', 'invalid-password', 'myModal');
};
pwd.onblur = function () {
  modalValidateInput('password', 'invalid-password', 'myModal');
};
rPwd.oninput = function () {
  modalValidateInput('repeat-password', 'invalid-password', 'myModal');
};
rPwd.onblur = function () {
  modalValidateInput('repeat-password', 'invalid-password', 'myModal');
};

// Validation all values of the form after click on the button
const regButton = document.getElementById('registration-button');
regButton.onclick = formValidation;

// JSON fetch
function loadStatistic() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      const { users } = data.static;
      const { messages } = data.static;
      const { todayMessages } = data.static;

      const usersCountElement = document.getElementById('usersRegistred');
      usersCountElement.innerHTML = `${users}`;

      const messagesTotalElement = document.getElementById('messagesTotal');
      messagesTotalElement.innerHTML = `${messages}`;

      const messagesTodayElement = document.getElementById('messagesToday');
      messagesTodayElement.innerHTML = `${todayMessages}`;
    })
    .catch((error) => console.error(error));
}

loadStatistic();

// JSON fetch messages
const grayMessages = document.getElementById('gray-messages');
const amoutOfMessagesToShow = 5;
const currentTime = new Date();

function loadMessages() {
  // Load date from posts.json
  fetch('/posts.json')
    .then((response) => response.json())
    .then((data) => {
      // Load data from picture.json
      fetch('./pictures.json')
        .then((response) => response.json())
        .then((pictures) => {
          for (let i = 0; i < amoutOfMessagesToShow; i += 1) {
            // eslint-disable-next-line max-len
            const picture = pictures.picturesMessage.find((par) => par.messageId === data[i].id);
            const pictureUrl = picture.urlAvatar;
            const postPictureUrl = picture.urlMessagePic;
            // get time difference from the post time and current time
            // eslint-disable-next-line max-len
            let date = timeConverter(Math.floor((currentTime - new Date(data[i].time)) / 1000 / 60));
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
            const messageHtml = `
                        <div class="post-all">
                            <img class="avatar" src="${pictureUrl}"/>
                            <div class="post">
                                <div class="nick-name-date">
                                    <div class="name-nick">
                                        <span class="name">${data[i].name}</span>
                                        <span class="nick">${data[i].nickname}</span>
                                    </div>
                                    <div class="date">
                                        <span class="time">${date}</span>
                                        <span class="ago">${ago}</span>
                                    </div>
                                </div>
                                <div class="message">
                                    <p>${data[i].content}</p>
                                    <img class="attached-picture" src="${postPictureUrl}"/>
                                </div>
                                <div class="counters">
                                    <div class="repost">
                                        <img src="img/repost.svg">
                                        <span>${data[i].reposts}</span>
                                    </div>
                                    <div class="like">
                                        <img src="img/like.svg">
                                        <span>${data[i].likes}</span>
                                    </div>
                                    <div class="share">
                                        <img src="img/share.svg">
                                        <span>${data[i].shares}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
            `;
            grayMessages.classList.add('hidden');
            document.getElementById('all-posts-id').insertAdjacentHTML('beforeend', messageHtml);
          }
        })
        .catch((error) => console.error('Error with picture.json', error));
    })
    .catch((error) => console.error('Error with data.json', error));
}

setTimeout(() => {
  loadMessages();
}, 3000);

// JSON fetch populas tags
const grayTopics = document.getElementById('gray-topics');
const tagsToSHow = 5;
function loadTags() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      const topic = data.topics;
      for (let i = 0; i < tagsToSHow; i += 1) {
        const currentTopicsHtml = `
                        <h5>${topic[i].tag}</h5>
                        <p>${topic[i].messages}</p>
            `;
        grayTopics.classList.add('hidden');
        document.getElementById('current-topics').insertAdjacentHTML('beforeend', currentTopicsHtml);
      }
    })
    .catch((error) => console.error(error));
}

setTimeout(() => {
  loadTags();
}, 3000);

// JSON fetch channels
const grayChannels = document.getElementById('gray-channels');
const channelsToShow = 3;
function loadChannels() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      const blog = data.blogs;
      fetch('./pictures.json')
        .then((response) => response.json())
        .then((pictures) => {
          for (let i = 0; i < channelsToShow; i += 1) {
            const picture = pictures.picturesChannel.find((par) => par.channelId
          === blog[i].id);
            const pictureUrl = picture.url;
            const interestingChannelsHtml = `
                        <div id ="interesting-channels">
                            <div class="channel">
                                <img class="channel-logo" src="${pictureUrl}"/>
                                <div class="channel-name-and-nick">
                                    <span class="channel-name">${blog[i].channelName}</span>
                                    <span class="channel-nick">${blog[i].channelNick}</span>
                                </div>
                                <button class="read">Read</button>
                            </div>
            `;
            grayChannels.classList.add('hidden');
            document.getElementById('interesting-channels').insertAdjacentHTML('beforeend', interestingChannelsHtml);
          }
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

setTimeout(() => {
  loadChannels();
}, 3000);

// Twitter timer
function updateTime() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      const allMessages = data.lastMessages;
      const currentTimeUpdate = new Date();
      const timeElements = document.getElementsByClassName('time');
      const agoStringElements = document.getElementsByClassName('ago');
      for (let i = 0; i < timeElements.length; i += 1) {
        const timeElement = timeElements[i];
        const agoStringElement = agoStringElements[i];
        // get post time from json
        const messageTime = new Date(allMessages[i].time);
        // eslint-disable-next-line max-len
        const formattedTime = timeConverter(Math.floor((currentTimeUpdate - messageTime) / 60000));
        // put time without 'ago' word at the time span element
        timeElement.textContent = formattedTime.substring(0, formattedTime.length - 3);
        // put word ' ago' at the next span after time span
        agoStringElement.innerHTML = '&nbsp;ago';
      }
    })
    .catch((error) => console.error(error));
}
// update every minute
setInterval(updateTime, 60000);

// Create user
const registrationButton = document.getElementById('registration-button');

registrationButton.addEventListener('click', () => {
  // Get the modal
  const modal = document.getElementById('modal-sign-in');

  const nickname = `@${document.getElementById('nick-name').value}`;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeat-password').value;

  const userData = {
    nickname,
    email,
    password,
    repeatPassword,
  };

  if (nickname !== '' && email !== '' && password !== '' && password === repeatPassword) {
    fetch('/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          modal.style.visibility = 'hidden';
          modal.style.opacity = 0;
          window.location.href = '/feed';
        } else if (response.status === 400) {
          modalValidateInputDataBase('nick-name', 'invalid-nick-name', 'myModal');
        } else if (response.status === 409) {
          modalValidateInputDataBase('email', 'invalid-email', 'myModal');
        } else if (response.status === 410) {
          modalValidateInputDataBase('nick-name', 'invalid-nick-name', 'myModal');
          modalValidateInputDataBase('email', 'invalid-email', 'myModal');
        }
        return response.json();
      });
  }
});

// Login
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  // Get the modal
  const modal = document.getElementById('modal-login');

  const email = document.getElementById('login-authorization').value;
  const password = document.getElementById('login-password').value;

  const userData = {
    email,
    password,
  };

  if (email !== '' && password !== '') {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          modal.style.visibility = 'hidden';
          modal.style.opacity = 0;
          window.location.href = '/feed';
        } else if (response.status === 400) {
          modalValidateInputDataBase('login-password', 'invalid-password-login', 'loginModal');
        } else if (response.status === 404) {
          modalValidateInputDataBase('login-authorization', 'invalid-nick-name-login', 'loginModal');
        }
        return response.json();
      });
  }
});
