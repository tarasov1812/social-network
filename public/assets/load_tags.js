/**
 * Function for loading popular tags
 */
import axios from 'axios';

const grayTopics = document.getElementById('gray-topics');
const loadTags = async () => {
  const response = await axios.get('/tags');
  response.data.tags.forEach((topic) => {
    const currentTopicsHtml = `
                        <h5>${topic.tag}</h5>
                        <p>${topic.messages}</p>
            `;
    grayTopics.classList.add('hidden');
    document.getElementById('current-topics').insertAdjacentHTML('beforeend', currentTopicsHtml);
  });
};

export default loadTags;
