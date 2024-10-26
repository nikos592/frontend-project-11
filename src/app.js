import { fetchRSSData } from './fetchRSS.js';
import { parseFeed } from './parseFeed.js';
import { renderFeeds } from './render.js';

document.getElementById('rssForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('add-rss').value.trim();

  if (!url) {
    document.getElementById('error').textContent = 'Пожалуйста, введите URL.';
    return;
  }

  try {
    const rssText = await fetchRSSData(url);
    const parsedFeed = parseFeed(rssText);
    renderFeeds(parsedFeed);
    document.getElementById('error').textContent = ''; 
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    document.getElementById('error').textContent = 'Ошибка при загрузке фида. Пожалуйста, проверьте введенный URL.';
  }
});