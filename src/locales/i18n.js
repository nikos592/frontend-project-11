import i18next from 'i18next';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        title: 'RSS агрегатор',
        description: 'Начните читать RSS сегодня! Это легко, это красиво.',
        add: 'Добавить',
        example: 'Пример: [https://lorem-rss.hexlet.app/feed](https://lorem-rss.hexlet.app/feed)',
        createdBy: 'created by <a href="https://github.com/nikos592" target="_blank">nikos592</a>',
        validation: {
          invalidUrl: 'Некорректный URL',
          urlExists: 'URL уже существует',
        },
      },
    },
  },
});

export default i18next;
