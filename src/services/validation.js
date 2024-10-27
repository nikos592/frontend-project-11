import * as yup from 'yup';

const validateUrl = (url, feeds) => {
  yup.setLocale({
    string: {
      url: 'validURL',
      default: 'unknownError',
    },
    mixed: {
      notOneOf: 'alreadyExists',
      default: 'unknownError',
    },
  });

  const baseUrlSchema = yup.string().url().required();
  const feedUrls = feeds.map((feed) => feed.url);
  const actualUrlSchema = baseUrlSchema.notOneOf(feedUrls);

  try {
    actualUrlSchema.validateSync(url);
    return null;
  } catch (e) {
    return e.message;
  }
};

export default validateUrl;
