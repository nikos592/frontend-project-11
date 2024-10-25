export async function fetchRSSData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const rssText = await response.text();
  return rssText;
}