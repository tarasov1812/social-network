/* eslint-disable no-unused-vars */
/**
 * This function checks if email is correct
 * @param {*} email - user email
 * @returns if email es correct - true, if not - false
 */
function validateEmail(email) {
  // dictionary of top-10 most populars domens
  const domens = ['.com', '.org', '.net', '.gov', '.edu', '.es', '.ru', '.de', '.uk', '.nl'];
  // remove extra spaces at the beginning and at the end of the email if there are some
  const emailWithotSpaces = email.trim();

  // if the email contains extra spaces, immediately return false
  if (emailWithotSpaces.includes(' ')) {
    return false;
  }

  // check that the email contains exactly one @
  const emailLetters = emailWithotSpaces.split('');
  let at = 0;
  emailLetters.forEach((letter) => {
    if (letter === '@') {
      at += 1;
    }
  });
  if (at !== 1) {
    return false;
  }
  // check that the length of the name is at least one character
  const namesToCheck = emailWithotSpaces.split('@');
  if (namesToCheck[0].length < 1 || namesToCheck[1].length < 1) {
    return false;
  }
  // check that there is a domain name at the end of the email
  if (domens.some((domain) => emailWithotSpaces.endsWith(domain))) {
    return true;
  }
  // return false if the conditions above do not fit
  return false;
}

function modalValidateEmail() {
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
