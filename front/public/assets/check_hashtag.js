/**
 * Function for determining which words are a hashtag
 * @param {*} arrayPosts - array of posts
 * @returns array of words that are hashtags
 */
export default function checkHashtag(arrayPosts) {
  // create a string from the array of posts
  const message = arrayPosts.join(' ');
  // split a sentence into an array of words
  const arrayMessage = message.split(' ');
  // create an empty array for retrun values
  const arrayHashtag = [];
  // a regular expression that contains all the forbidden characters in the hashtag
  const regEx = /[^\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/ui;
  // check every word of the message
  arrayMessage.forEach((word) => {
    // if a word has a # simbol and it's length more than 1 simbol
    if (word.startsWith('#') && word.length > 1) {
      // remove the hashtag for further word verification
      const wordWithoutTag = word.substring(1);
      // search for a first forbidden symbol (if it exist)
      const xSimbol = regEx.exec(wordWithoutTag);
      // if there are no forbidden characters - add this word to the array
      if (xSimbol === null) {
        arrayHashtag.push(wordWithoutTag);
      // if the first character is forbidden - it's not a hashtag
      // in any other situation, split the word into two parts:
      // the first part is a hashtag - add it to the array
      } else if (xSimbol.index !== 0) {
        const firstPart = wordWithoutTag.slice(0, xSimbol.index);
        arrayHashtag.push(firstPart);
      }
    // if there is no # symbol at the beginning of a word, then it is not a hashtag
    }
  });
  // return array of words that are hashtags
  return arrayHashtag;
}
