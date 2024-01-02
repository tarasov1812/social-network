/**
 * Function for loading interesting channels
 */

const grayChannels = document.getElementById('gray-channels');
const loadChannels = async () => {
  // eslint-disable-next-line no-undef
  const response = await axios.get('/channels');
  response.data.channels.forEach((channel) => {
    const interestingChannelsHtml = `
                        <div id ="interesting-channels">
                            <div class="channel">
                                <img class="channel-logo" src="${channel.img}"/>
                                <div class="channel-name-and-nick">
                                    <span class="channel-name">${channel.channelName}</span>
                                    <span class="channel-nick">${channel.channelNick}</span>
                                </div>
                                <button class="read">Read</button>
                            </div>
            `;
    grayChannels.classList.add('hidden');
    document.getElementById('interesting-channels').insertAdjacentHTML('beforeend', interestingChannelsHtml);
  });
};

export default loadChannels;
