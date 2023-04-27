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
