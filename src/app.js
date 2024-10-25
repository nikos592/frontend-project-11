import { fetchRSSData } from './fetchRSS.js';
import { parseFeed } from './parseFeed.js';
import { renderFeeds } from './render.js';

document.getElementById('rssForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('add-rss').value;

  try {
    const rssText = await fetchRSSData(url);
    const parsedFeed = parseFeed(rssText);
    renderFeeds(parsedFeed);
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    document.getElementById('error').innerHTML = 'Ошибка при загрузке фида. Пожалуйста, попробуйте снова.';
  }
});