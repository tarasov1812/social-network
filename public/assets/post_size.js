/**
 * This function counts all characters in the message, except for links
 * @param {*} message - user message
 * @returns number of characters in the message, except for links
 */

export default function posSize(message) {
  // dictionary of top-10 most populars domens
  const domens = ['.com', '.org', '.net', '.gov', '.edu', '.es', '.ru', '.de', '.uk', '.nl'];
  // create array of words if the message for checking if the word has a link
  const arrayMessage = message.split(' ');
  // count all spaces in the string
  let space = 0;
  // check every word of the message
  for (let i = 0; i < arrayMessage.length; i += 1) {
    // if a word has a domain attribute, this word will be removed from the array
    for (let j = 0; j < domens.length; j += 1) {
      if (arrayMessage[i] === undefined) {
        break;
      } else if (arrayMessage[i].endsWith(domens[j])) {
        if (arrayMessage.length > 1) {
          space += 1;
        }
        arrayMessage.splice(i, 1);
      } else if (arrayMessage[i].startsWith('https://')) {
        if (arrayMessage.length > 1) {
          space += 1;
        }
        arrayMessage.splice(i, 1);
      } else if (arrayMessage[i].startsWith('http://')) {
        if (arrayMessage.length > 1) {
          space += 1;
        }
        arrayMessage.splice(i, 1);
      } else if (arrayMessage[i].startsWith('www.')) {
        if (arrayMessage.length > 1) {
          space += 1;
        }
        arrayMessage.splice(i, 1);
      }
    }
  }
  // create a string from the modified array
  const newMessage = arrayMessage.join(' ');
  // return length of the string
  return newMessage.length + space;
}
