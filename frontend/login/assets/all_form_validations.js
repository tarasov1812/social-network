import modalValidateEmail from './modal_validate_email.js';
import modalValidateInput from './modal_validate_input.js';
import formValidation from './form_validation.js';

/**
 * Function to check sing up form validation
 */
export default function allFormValidations() {
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
}
