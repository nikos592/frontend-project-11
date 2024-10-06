import * as Yup from 'yup';

// Изначально пустой массив для сохранения добавленных URL
const existingUrls = [];

// Создаем схему валидации через Yup
const schema = Yup.string()
  .url('Некорректный URL') // Проверка на корректность URL
  .notOneOf(existingUrls, 'URL уже существует'); // Проверка на отсутствие дубликатов

// Добавляем обработчик события "submit" на форму с id "rssForm"
document.getElementById('rssForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  const inputField = document.getElementById('add-rss'); // Получаем поле ввода
  const errorField = document.getElementById('error'); // Получаем элемент для отображения ошибок
  const url = inputField.value.trim(); // Получаем значение из поля ввода и убираем пробелы

  // Выполняем валидацию введенного URL
  schema.validate(url)
    .then(() => {
      // Очищаем поле ошибок
      errorField.textContent = '';
      
      // Добавляем новый URL в массив existingUrls
      existingUrls.push(url);

      // Дополнительно: очищаем поле ввода и выводим сообщение об успехе (если необходимо)
      inputField.value = '';
      console.log('URL успешно добавлен:', url);
      console.log('Текущий список URL:', existingUrls);

      // Здесь можно добавить логику для дальнейшей обработки, например, отправки данных на сервер или обновления UI
    })
    .catch((error) => {
      // Выводим сообщение об ошибке, если URL не прошел валидацию
      errorField.textContent = error.message;
    });
});
