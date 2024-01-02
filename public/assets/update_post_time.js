import timeConverter from './time_converter.js';

/**
 * Function for updating time of post on the main page
 */

export default function updatePostTime() {
  const postElements = document.querySelectorAll('.post .nick-name-date .date .time');

  postElements.forEach((element) => {
    const dataDateAttribute = element.getAttribute('data-date');
    // Parse the data-date attribute value to a Date object
    const postDate = new Date(dataDateAttribute);
    const currentDate = new Date(); // Current date and time

    // Time difference in minutes
    const timeDifference = Math.floor((currentDate - postDate) / (1000 * 60));

    // Get the converted time string
    let convertedTime = timeConverter(timeDifference);

    // Create a new variable to store the updated text content
    if (convertedTime.includes('ago')) {
      // if from timeConverter we got word 'ago' - we need to cut it
      convertedTime = convertedTime.slice(0, -4);
    }

    // Update the DOM with the updated time content
    // eslint-disable-next-line no-param-reassign
    element.textContent = convertedTime;
  });
}
