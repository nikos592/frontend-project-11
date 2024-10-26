 function parseFeed(rssText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'application/xml');

  const parseError = xmlDoc.getElementsByTagName('parsererror');
  if (parseError.length) {
    throw new Error('Ошибка при разборе XML');
  }

  const items = xmlDoc.querySelectorAll('item');
  const feedData = [];

  items.forEach(item => {
    const title = item.querySelector('title')?.textContent || 'Нет заголовка';
    const description = item.querySelector('description')?.textContent || 'Нет описания';
    const link = item.querySelector('link')?.textContent || '#';
    feedData.push({ title, description, link });
  });

  return feedData;
}

export default parseFeed;