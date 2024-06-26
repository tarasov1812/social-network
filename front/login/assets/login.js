import modalValidateInputDataBase from './modale_validate_input_dataB.js';
/**
 * Function to login into account
 */
export default function login() {
  const loginButton = document.getElementById('login-button');

  loginButton.addEventListener('click', async () => {
  // Get the modal
    const modal = document.getElementById('modal-login');

    const email = document.getElementById('login-authorization').value;
    const password = document.getElementById('login-password').value;

    if (email !== '' && password !== '') {
      try {
      // eslint-disable-next-line no-undef
        const response = await axios.post('/api/login', { email, password });

        if (response.status === 200) {
          modal.style.visibility = 'hidden';
          modal.style.opacity = 0;
          window.location.href = '/';
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
}
