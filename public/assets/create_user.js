import modalValidateInputDataBase from './modale_validate_input_dataB.js';
import allFormValidations from './all_form_validations.js';
/**
 * Function for creating a user in a from validation
 */
export default function createUser() {
  const registrationButton = document.getElementById('registration-button');

  registrationButton.addEventListener('click', async () => {
  // Get the modal
    const modal = document.getElementById('modal-sign-in');

    const nickname = `@${document.getElementById('nick-name').value}`;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    if (nickname !== '' && email !== '' && password !== '' && password === repeatPassword) {
      try {
      // eslint-disable-next-line no-undef
        const response = await axios.post('/createUser', {
          nickname, email, password, repeatPassword,
        });
        if (response.status === 200) {
          modal.style.visibility = 'hidden';
          modal.style.opacity = 0;
          window.location.href = '/app';
        }
      } catch (error) {
        if (error.response.status === 406) {
          modalValidateInputDataBase('nick-name', 'invalid-nick-name', 'myModal');
        } else if (error.response.status === 409) {
          modalValidateInputDataBase('email', 'invalid-email', 'myModal');
        } else if (error.response.status === 410) {
          modalValidateInputDataBase('nick-name', 'invalid-nick-name', 'myModal');
          modalValidateInputDataBase('email', 'invalid-email', 'myModal');
        } else {
          console.log('Unexpected error');
        }
      }
    }
  });

  // Calling from validation function to put warning
  allFormValidations();
}
