import validateEmail from './validate_email.js';
import modalValidateInput from './modal_validate_input.js';

/**
 * Function for checking all input values of the form before sending
 */

export default function formValidation() {
// creatу variables for every input field
  const nickName = document.getElementById('nick-name');
  const emailAdress = document.getElementById('email');
  const password = document.getElementById('password');
  const reapeatPassword = document.getElementById('repeat-password');
  // If the passwords match, all input fields are filled in, and email validation is correct
  // Outputs the value to the console using console.log()
  if (nickName.value.length > 0 && emailAdress.value.length > 0 && password.value.length > 0
         && reapeatPassword.value.length > 0 && password.value === reapeatPassword.value
         && validateEmail(emailAdress.value)) {
    // If any input field is not filled in, we highlight it using the imported function
  } else {
    if (nickName.value < 1) {
      modalValidateInput('nick-name', 'invalid-nick-name', 'myModal');
    }
    if (emailAdress.value < 1) {
      modalValidateInput('email', 'invalid-email', 'myModal');
    }
    if (password.value < 1) {
      modalValidateInput('password', 'invalid-password', 'myModal');
      document.getElementById('invalid-password').innerHTML = 'The field should not be empty';
    }
    if (reapeatPassword.value < 1) {
      modalValidateInput('repeat-password', 'invalid-password', 'myModal');
      document.getElementById('invalid-password').innerHTML = 'The field should not be empty';
    }
    if (password.value !== reapeatPassword.value && password.value.length > 0
        && reapeatPassword.value.length > 0) {
      modalValidateInput('password', 'invalid-password', 'myModal');
      modalValidateInput('repeat-password', 'invalid-password', 'myModal');
      document.getElementById('invalid-password').style.visibility = 'visible';
      document.getElementById('invalid-password').innerHTML = 'Passwords are not the same';
    }
  }
}
