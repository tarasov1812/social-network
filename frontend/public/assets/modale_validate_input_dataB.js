/**
 * This function is for changing the input illumination, and the
 * appearance of a warning message if the entered value does not meet the requirements.
 * @param {*} inputId - id of the required input
 * @param {*} divId - id of the required div with a warning message
 * @param {*} form - id of the form in which the input and div are located
 */

export default function modalValidateInputDataBase(inputId, divId, form) {
  if (document.getElementById(form).style.visibility === 'visible') {
    document.getElementById(inputId).style.backgroundColor = '#FFDEEC';
    document.getElementById(inputId).style.border = '1px solid #FF97C3';
    document.getElementById(divId).style.visibility = 'visible';
    if (divId === 'invalid-nick-name') {
      document.getElementById(divId).innerHTML = 'User already Exist';
    }
    if (divId === 'invalid-email') {
      document.getElementById(divId).innerHTML = 'Email already Exist';
    }
    if (divId === 'invalid-nick-name-login') {
      document.getElementById(divId).innerHTML = 'User not found';
    }
  } else {
    document.getElementById(divId).style.visibility = 'hidden';
    document.getElementById(inputId).style.backgroundColor = '#FFFFFF';
    document.getElementById(inputId).style.border = '1px solid rgba(223, 223, 223, 1)';
  }
}
