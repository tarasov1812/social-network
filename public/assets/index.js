import modalValidateEmail from './modal_validate_email.js';
import modalValidateInput from './modal_validate_input.js';
import formValidation from './form_validation.js';

// Validate email of the Registration form
const email = document.getElementById('email');

email.onblur = function () {
  modalValidateEmail('email', 'invalid-email', 'myModal');
};
email.oninput = function () {
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
function loadMessages() {
  // Load date from data.json
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      // Load data from picture.json
      fetch('./pictures.json')
        .then((response) => response.json())
        .then((pictures) => {
          for (let i = 0; i < amoutOfMessagesToShow; i += 1) {
            const picture = pictures.picturesMessage.find((par) => par.messageId
            === data.lastMessages[i].id);
            const pictureUrl = picture ? picture.urlAvatar : '';
            const postPictureUrl = picture ? picture.urlMessagePic : '';
            const messageHtml = `
                        <div class="post-all">
                            <img class="avatar" src="${pictureUrl}"/>
                            <div class="post">
                                <div class="nick-name-date">
                                    <div class="name-nick">
                                        <span class="name">${data.lastMessages[i].author}</span>
                                        <span class="nick">${data.lastMessages[i].nickName}</span>
                                    </div>
                                    <div class="date">
                                        <span class="time">${data.lastMessages[i].time}</span>
                                        <span class="ago">&nbsp ago</span>
                                    </div>
                                </div>
                                <div class="message">
                                    <p>${data.lastMessages[i].content}</p>
                                    <img class="attached-picture" src="${postPictureUrl}"/>
                                </div>
                                <div class="counters">
                                    <div class="repost">
                                        <img src="img/repost.svg">
                                        <span>${data.lastMessages[i].reposts}</span>
                                    </div>
                                    <div class="like">
                                        <img src="img/like.svg">
                                        <span>${data.lastMessages[i].likes}</span>
                                    </div>
                                    <div class="share">
                                        <img src="img/share.svg">
                                        <span>${data.lastMessages[i].shares}</span>
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
            const pictureUrl = picture ? picture.url : '';
            const interestingChannelsHtml = `
                        <div id ="interesting-channels">
                            <div class="channel">
                                <img class="channel-logo" src="${pictureUrl}"/>
                                <div class="channel-name-and-nick">
                                    <span class="channel-name">${blog[i].channelName}</span>
                                    <span class="channel-nick">>${blog[i].channelNick}</span>
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
