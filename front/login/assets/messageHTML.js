/**
 * Function for create HTML code for a post
 * @param {*} avatar - user's avatar (link to img)
 * @param {*} name - user's name (string)
 * @param {*} nickname - user's nickname (string)
 * @param {*} date - calculated peridod of time from posted date until now
 * @param {*} ago - word 'ago' or empty string (depends on a condition)
 * @param {*} content - message's content (string)
 * @param {*} pictureUrl - url to a message's picture o empty sting if there is no picture
 * @param {*} reposts - amount of reposts (number)
 * @param {*} likes - amount of likes (number)
 * @param {*} shares - amount of shares (number)

 * @returns HTML code of message
 */

export default function messageHTML(
  avatar,
  name,
  nickname,
  date,
  ago,
  content,
  pictureUrl,
  reposts,
  likes,
  shares,
  time,
) {
  return `
<div class="post-all">
    <img class="avatar" src="${avatar}"/>
    <div class="post">
        <div class="nick-name-date">
            <div class="name-nick">
                <span class="name">${name}</span>
                <span class="nick">${nickname}</span>
            </div>
            <div class="date">
                <span class="time" data-date="${time}">${date}</span>
                <span class="ago">${ago}</span>
            </div>
        </div>
        <div class="message">
            <p>${content}</p>
            <img class="attached-picture" src="${pictureUrl}"/>
        </div>
        <div class="counters">
            <div class="repost">
                <img src="https://ucarecdn.com/7ed6ab1d-68f7-4878-ae65-7a8a8b8f5a4c/repost.svg">
                <span>${reposts}</span>
            </div>
            <div class="like">
                <img src="https://ucarecdn.com/5f9ba37b-33cf-4598-ae6e-f8744e12d03f/like.svg">
                <span>${likes}</span>
            </div>
            <div class="share">
                <img src="https://ucarecdn.com/3ceac7aa-b8c1-4d59-b6cc-578815e188d3/share.svg">
                <span>${shares}</span>
            </div>
        </div>
    </div>
</div>
<hr>
`;
}
