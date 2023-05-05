/**
 * Function of converting numbers to time
 * @param {*} number - any numbre
 * @returns time in minutes or hours or days or over one year ago
 */

export default function timeConverter(number) {
  // if the number is less than one, return - now, even if it is negative
  if (number < 1) {
    return 'now';
  }
  // one minute singular
  if (number === 1) {
    return `${number} minute`;
  }

  // from 2 minutes until 59 minutes  in plural
  if (number > 1 && number < 60) {
    return `${number} minutes`;
  }
  // one hour singular
  if (number >= 60 && number < 120) {
    return '1 hour';
  }

  // from 2 hours until 23 hours in plural
  if (number >= 120 && number < 1440) {
    const hourNum = Math.floor(number / 60);
    return `${hourNum} hours`;
  }

  // one day singular
  if (number >= 1440 && number < 2880) {
    return '1 day';
  }

  // from 2 days until 365 days in plural
  if (number >= 2880 && number < 527040) {
    const daysNum = Math.floor(number / 1440);
    return `${daysNum} days`;
  }

  // any higher numbers is over one year ago
  if (number >= 527040) {
    return 'over one year';
  }

  // in any other case return empty string
  return '';
}
