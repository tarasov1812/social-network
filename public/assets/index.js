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
function loadMessages() {
  // Load date from data.json
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      // Load data from picture.json
      fetch('./pictures.json')
        .then((response) => response.json())
        .then((pictures) => {
          data.lastMessages.forEach((message) => {
            const picture = pictures.picturesMessage.find((par) => par.messageId === message.id);
            const pictureUrl = picture ? picture.urlAvatar : '';
            const postPictureUrl = picture ? picture.urlMessagePic : '';
            const messageHtml = `
                        <div class="post-all">
                            <img class="avatar" src="${pictureUrl}"/>
                            <div class="post">
                                <div class="nick-name-date">
                                    <div class="name-nick">
                                        <span class="name">${message.author}</span>
                                        <span class="nick">${message.nickName}</span>
                                    </div>
                                    <div class="date">
                                        <span class="time">${message.time}</span>
                                        <span class="ago">&nbsp ago</span>
                                    </div>
                                </div>
                                <div class="message">
                                    <p>${message.content}</p>
                                    <img class="attached-picture" src="${postPictureUrl}"/>
                                </div>
                                <div class="counters">
                                    <div class="repost">
                                        <img src="img/repost.svg">
                                        <span>${message.reposts}</span>
                                    </div>
                                    <div class="like">
                                        <img src="img/like.svg">
                                        <span>${message.likes}</span>
                                    </div>
                                    <div class="share">
                                        <img src="img/share.svg">
                                        <span>${message.shares}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
            `;
            document.getElementById('all-posts-id').insertAdjacentHTML('beforeend', messageHtml);
          });
        })
        .catch((error) => console.error('Error with picture.json', error));
    })
    .catch((error) => console.error('Error with data.json', error));
}

loadMessages();
