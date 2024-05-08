/**
 * This function replaces all links in the message with html code
 * @param {*} message - user message
 * @returns new message with html code instead of links
 */
export default function changeLikns(message) {
  // dictionary of top-10 most populars domens
  const domens = ['.com', '.org', '.net', '.gov', '.edu', '.es', '.ru', '.de', '.uk', '.nl'];
  // create array of words if the message for checking if the word has a link
  const arrayMessage = message.split(' ');
  // create a new array to push a values we need
  const copyArrayMessage = [];
  // check every word of the message
  arrayMessage.forEach((word) => {
    // if a word has a domain attribute, this word will be replaced by html code instead of links
    if (domens.some((domain) => word.endsWith(domain))) {
      copyArrayMessage.push(`<a href="${word}">${word}</a>`);
    } else if (word.startsWith('https://')) {
      copyArrayMessage.push(`<a href="${word}">${word}</a>`);
    } else if (word.startsWith('http://')) {
      copyArrayMessage.push(`<a href="${word}">${word}</a>`);
    } else if (word.startsWith('www.')) {
      copyArrayMessage.push(`<a href="${word}">${word}</a>`);
    } else {
      copyArrayMessage.push(word);
    }
  });
  // create a string from the modified array
  const newMessage = copyArrayMessage.join(' ');
  // return length of the string
  return newMessage;
}
