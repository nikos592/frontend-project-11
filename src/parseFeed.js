export function parseFeed(rssText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'application/xml');
  const items = xmlDoc.querySelectorAll('item');
  const feedData = [];

  items.forEach(item => {
    const title = item.querySelector('title').textContent || 'No title';
    const description = item.querySelector('description').textContent || 'No description';
    const link = item.querySelector('link').textContent || '#';
    feedData.push({ title, description, link });
  });

  return feedData;
}