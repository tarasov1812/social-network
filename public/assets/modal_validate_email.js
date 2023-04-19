import validateEmail from './validate_email.js';

export default function modalValidateEmail() {
  const email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    document.getElementById('email').style.backgroundColor = '#FFDEEC';
    document.getElementById('email').style.border = '1px solid #FF97C3';
    document.getElementById('invalid-email').style.visibility = 'visible';
  } else {
    document.getElementById('email').style.backgroundColor = '#FFFFFF';
    document.getElementById('email').style.border = '1px solid rgba(223, 223, 223, 1)';
    document.getElementById('invalid-email').style.visibility = 'hidden';
  }
}
