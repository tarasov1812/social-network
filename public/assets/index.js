import modalValidateEmail from './modal_validate_email.js';
import modalValidateInput from './modal_validate_input.js';
import formValidation from './form_validation.js';
import loadStatistic from './load_statistic.js';
import loadMessages from './load_messages.js';
import loadTags from './load_tags.js';
import loadChannels from './load_channels.js';
import './login.js';
import './create_user.js';

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

// load statistic of amount of written messages and amount of users
loadStatistic();

// load latest messages
loadMessages();

// load popular tags
loadTags();

// load popular channels
loadChannels();

// Twitter timer
// function updateTime() {
//   fetch('./data.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const allMessages = data.lastMessages;
//       const currentTimeUpdate = new Date();
//       const timeElements = document.getElementsByClassName('time');
//       const agoStringElements = document.getElementsByClassName('ago');
//       for (let i = 0; i < timeElements.length; i += 1) {
//         const timeElement = timeElements[i];
//         const agoStringElement = agoStringElements[i];
//         // get post time from json
//         const messageTime = new Date(allMessages[i].time);
//         // eslint-disable-next-line max-len, max-len
//         const formattedTime =
// timeConverter(Math.floor((currentTimeUpdate - messageTime) / 60000));
//         // put time without 'ago' word at the time span element
//         timeElement.textContent = formattedTime.substring(0, formattedTime.length - 3);
//         // put word ' ago' at the next span after time span
//         agoStringElement.innerHTML = '&nbsp;ago';
//       }
//     })
//     .catch((error) => console.error(error));
// }
// // update every minute
// setInterval(updateTime, 60000);
