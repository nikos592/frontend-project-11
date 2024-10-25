export function renderFeeds(feedData) {
  const feedsContainer = document.querySelector('.feed-list');
  feedsContainer.innerHTML = '';

  feedData.forEach(feed => {
    const { title, description } = feed;

    const feedElement = document.createElement('li');
    feedElement.classList.add('feed-list-item');

    feedElement.innerHTML = `
      <p><strong>${title}</strong></p>
      <p>${description}</p>
    `;

    feedsContainer.appendChild(feedElement);
  });
}