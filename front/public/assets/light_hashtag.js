/**
 * This function сonvert the message into htmlcode if there are hashtags
 * @param {*} message - user message
 * @returns  message with htmlcode if there are hashtags, if there are not - return the same message
 */
export default function lightHashtag(message) {
  // split a sentence into an array of words
  const arrayMessage = message.split(' ');
  // create an empty array for return
  const copyArrayMessage = [];
  // a regular expression that contains all the forbidden characters in the hashtag
  const regEx = /[^\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/ui;
  // check every word of the message
  arrayMessage.forEach((word) => {
    // if a word has a hashtag and it's length more than 1 simbol
    if (word.startsWith('#') && word.length > 1) {
      // remove the hashtag for further word verification
      const wordWithoutTag = word.substring(1);
      // search for a first forbidden symbol (if it exist)
      const xSimbol = regEx.exec(wordWithoutTag);
      // if there are no forbidden characters - make a highlight with the htmlcode
      if (xSimbol === null) {
        copyArrayMessage.push(`<a href="/search?tag=${wordWithoutTag}">${word}</a>`);
      // if the first character is forbidden - it's not a hashtag, insert a word into the array
      } else if (xSimbol.index === 0) {
        copyArrayMessage.push(word);
      // in any other situation, split the word into two parts:
      // the first part with a hashtag and highlighting and the second part without highlighting
      } else {
        const firstPart = wordWithoutTag.slice(0, xSimbol.index);
        const secondPart = wordWithoutTag.slice(xSimbol.index);
        copyArrayMessage.push(`<a href="/search?tag=${firstPart}">#${firstPart}</a>${secondPart}`);
      }
    // if there is no # symbol at the beginning of a word, then it is not a hashtag
    } else {
      copyArrayMessage.push(word);
    }
  });
  // create a string from the array
  const newMessage = copyArrayMessage.join(' ');
  // return message;
  return newMessage;
}
