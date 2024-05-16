import loadStatistic from './load_statistic.js';
import loadMessages from './load_messages.js';
import loadTags from './load_tags.js';
import loadChannels from './load_channels.js';
import updatePostTime from './update_post_time.js';
import login from './login.js';
import createUser from './create_user.js';

// load statistic of amount of written messages and amount of users
loadStatistic();

// load latest messages
loadMessages();

// load popular tags
loadTags();

// load popular channels
loadChannels();

// create user
createUser();

// login
login();

// update time for messages every 10 seconds
setInterval(updatePostTime, 10000);
