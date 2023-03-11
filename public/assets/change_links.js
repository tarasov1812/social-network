/**
 * This function replaces all links in the message with html code
 * @param {*} message - user message
 * @returns new message with html code instead of links
 */
export default function change_likns(message) {
  // dictionary of top-10 most populars domens
  const domens = ['.com', '.org', '.net', '.gov', '.edu', '.es', '.ru', '.de', '.uk', '.nl'];
  // create array of words if the message for checking if the word has a link
  const arrayMessage = message.split(' ');
  // check every word of the message
  for (let i = 0; i < arrayMessage.length; i += 1) {
    // if a word has a domain attribute, this word will be replaced by html code instead of links
    for (let j = 0; j < domens.length; j += 1) {
      if (arrayMessage[i] === undefined) {
        break;
      } else if (arrayMessage[i].endsWith(domens[j])) {
        arrayMessage[i] = `<a href="${arrayMessage[i]}">${arrayMessage[i]}</a>`;
        break;
      } else if (arrayMessage[i].startsWith('https://')) {
        arrayMessage[i] = `<a href="${arrayMessage[i]}">${arrayMessage[i]}</a>`;
        break;
      } else if (arrayMessage[i].startsWith('http://')) {
        arrayMessage[i] = `<a href="${arrayMessage[i]}">${arrayMessage[i]}</a>`;
        break;
      } else if (arrayMessage[i].startsWith('www.')) {
        arrayMessage[i] = `<a href="${arrayMessage[i]}">${arrayMessage[i]}</a>`;
        break;
      }
    }
  }
  // create a string from the modified array
  const newMessage = arrayMessage.join(' ');
  // return length of the string
  return newMessage;
}
