/**
 * Function for loading statistic of written amount of messages and amount of registred users
 * by connection to API at the server
 */

const loadStatistic = async () => {
  try {
    // eslint-disable-next-line no-undef
    const response = await axios.get('/api/getInfo');
    const usersCountElement = document.getElementById('usersRegistred');
    usersCountElement.innerHTML = `${response.data.usersCount}`;

    const messagesTotalElement = document.getElementById('messagesTotal');
    messagesTotalElement.innerHTML = `${response.data.messagesCount}`;

    const messagesTodayElement = document.getElementById('messagesToday');
    messagesTodayElement.innerHTML = `${response.data.messagesTodayCount}`;
  } catch (error) {
    console.error('error:', error);
  }
};

export default loadStatistic;
