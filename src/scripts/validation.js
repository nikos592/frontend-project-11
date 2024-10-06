import * as Yup from 'yup';
import i18next from './i18n.js';

const existingUrls = [];

const schema = Yup.string()
  .url('Некорректный URL')
  .notOneOf(existingUrls, i18next.t('URL уже существует'));

document.getElementById('rssForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const inputField = document.getElementById('add-rss');
  const errorField = document.getElementById('error');
  const url = inputField.value.trim();

  schema.validate(url)
    .then(() => {
      errorField.textContent = '';
      existingUrls.push(url);
      inputField.value = '';
      console.log('URL успешно добавлен:', url);
      console.log('Текущий список URL:', existingUrls);
    })
    .catch((error) => {
      errorField.textContent = error.message;
    });
});

document.getElementById('title').textContent = i18next.t('title');
document.getElementById('description').textContent = i18next.t('description');
document.querySelector('button[type="submit"]').textContent = i18next.t('add');
