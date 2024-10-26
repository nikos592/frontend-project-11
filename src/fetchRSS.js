export async function fetchRSSData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const rssText = await response.text();
    return rssText;
  } catch (error) {
    console.error('Error fetching RSS data:', error);
    throw new Error('Ошибка сети. Пожалуйста, проверьте интернет соединение.');
  }
}