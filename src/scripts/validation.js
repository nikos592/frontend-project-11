import * as Yup from 'yup';
import i18next from './i18n.js';

const form = document.getElementById('rssForm');
const input = document.getElementById('add-rss');
const errorElement = document.getElementById('error');
const addedUrls = new Set();

const schema = Yup.string().url(i18next.t('validation.invalidUrl')).test(
  'is-unique',
  i18next.t('validation.urlExists'),
  (value) => !addedUrls.has(value)
);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  schema.validate(input.value)
    .then((validUrl) => {
      addedUrls.add(validUrl);
      input.value = '';
      input.classList.remove('input-error');
      errorElement.textContent = '';
    })
    .catch((err) => {
      input.classList.add('input-error');
      errorElement.textContent = err.message;
    });
});

document.getElementById('title').textContent = i18next.t('title');
document.getElementById('description').textContent = i18next.t('description');
document.querySelector('button[type="submit"]').textContent = i18next.t('add');
