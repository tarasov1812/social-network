/**
 * This function checks if email is correct
 * @param {*} email - user email
 * @returns if email es correct - true, if not - false
 */
export default function validateEmail(email) {
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
