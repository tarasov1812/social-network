import axios from 'axios';
import modalValidateInputDataBase from './modale_validate_input_dataB.js';
// Login
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
  // Get the modal
  const modal = document.getElementById('modal-login');

  const email = document.getElementById('login-authorization').value;
  const password = document.getElementById('login-password').value;

  if (email !== '' && password !== '') {
    try {
      const response = await axios.post('/login', { email, password });

      if (response.status === 200) {
        modal.style.visibility = 'hidden';
        modal.style.opacity = 0;
        window.location.href = '/app';
      }
    } catch (error) {
      if (error.response.status === 400) {
        modalValidateInputDataBase('login-password', 'invalid-password-login', 'loginModal');
      } else if (error.response.status === 404) {
        modalValidateInputDataBase('login-authorization', 'invalid-nick-name-login', 'loginModal');
      } else {
        console.log('Unexpected error');
      }
    }
  }
});
