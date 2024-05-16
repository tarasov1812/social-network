/**
 * Function for replacing swear words in a message
 * @param {*} message - user message
 * @param {*} censorship - array of swear words in a lowerCase
 * @returns returns the same message with '*' characters instead of swear words (if any)
 */

export default function platformFilter(message, censorship) {
  // create array of words if the message
  const arrayMessage = message.split(' ');
  // create empty array for cencored message
  const cencoredArray = [];
  // check every word of the message
  arrayMessage.forEach((word) => {
    // declare a counter
    let count = 0;
    // declare a copy of the word in case it's swear word
    let swearWord = word;
    // go through each swear word from the array (array of swear words should be in a lowerCase)
    censorship.forEach((censor) => {
      // create regular expression of the swear word with flags ignore case and global
      const swearRegExp = new RegExp(`${censor}`, 'ig');
      // if the word in lower case contains a swear word
      if (swearWord.toLowerCase().includes(censor)) {
        // repalce the swear word with '*' sibbols with length of the word
        swearWord = swearWord.replace(swearRegExp, '*'.repeat(censor.length));
        // increasing the counter by 1
        count += 1;
      }
    });
    if (count === 0) {
      cencoredArray.push(word);
    } else {
      cencoredArray.push(swearWord);
    }
    count = 0;
  });
  // create a string from the modified array
  const cencoredMessage = cencoredArray.join(' ');
  // return length of the string
  return cencoredMessage;
}
