/**
 * Function for loading popular tags
 */

const grayTopics = document.getElementById('gray-topics');
const loadTags = async () => {
  // eslint-disable-next-line no-undef
  const response = await axios.get('api/tags');
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
