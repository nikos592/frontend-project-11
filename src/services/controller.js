/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';

import watcher from '../views/view.js';
import parseRSS from './parseRSS.js';
import validateUrl from './validation.js';

const proxy = 'https://allorigins.hexlet.app/get';
const updateInterval = 5000;

const getProxyURL = (url) => {
  const proxyURL = new URL(proxy);
  proxyURL.pathname = 'get';
  proxyURL.searchParams.set('disableCache', 'true');
  proxyURL.searchParams.set('url', url);
  return proxyURL.toString();
};

const createPostsArray = (posts, feedId) => posts.map((dataPost) => ({
  id: _.uniqueId(),
  feedId,
  title: dataPost.title,
  link: dataPost.link,
  description: dataPost.description,
}));

const addStreamInState = (url, dataStream, watchedState) => {
  const feedId = _.uniqueId();

  watchedState.feeds.unshift({
    id: feedId,
    url,
    title: dataStream.titleFeed,
    description: dataStream.descriptionFeed,
  });

  const newPosts = createPostsArray(dataStream.posts, feedId);
  watchedState.posts.push(...newPosts);
};

const createListenerForm = (watchedState, elementsDOM) => {
  const addStream = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get('url').trim();

    watchedState.streamLoadingStatus = 'init';
    watchedState.validStatus = 'valid';
    const error = validateUrl(url, watchedState.feeds);

    if (error) {
      watchedState.errorMsgFeedback = error;
      watchedState.validStatus = 'error';
      return;
    }

    watchedState.validStatus = 'success';
    watchedState.streamLoadingStatus = 'loading';

    axios.get(getProxyURL(url))
      .then((response) => {
        const dataStream = parseRSS(response.data.contents);
        addStreamInState(url, dataStream, watchedState);
        watchedState.streamLoadingStatus = 'success';
        watchedState.errorMsgFeedback = '';
      })
      .catch((err) => {
        watchedState.errorMsgFeedback = err.isAxiosError ? 'networkError' : 'notValidRss';
        watchedState.streamLoadingStatus = 'error';
      });
  };

  elementsDOM.rssFormContainer.addEventListener('submit', addStream);
};

const createListenerClickLink = (watchedState, elementsDOM) => {
  const updateVisitedLink = (event) => {
    const postId = event.target.dataset.id;
    if (postId) {
      watchedState.uiState.visitedPosts.push(postId);
      watchedState.uiState.modalPostId = postId;
    }
  };

  elementsDOM.postsContainer.addEventListener('click', updateVisitedLink);
};

const isPostInState = (objStream, objState) => objStream.title === objState.title;

const addNewPostsInState = (dataStream, feedId, watchedState) => {
  const stateFeedPosts = watchedState.posts.filter((post) => post.feedId === feedId);
  const differencePosts = _.differenceWith(dataStream.posts, stateFeedPosts, isPostInState);
  const newPosts = createPostsArray(differencePosts, feedId);
  watchedState.posts.push(...newPosts);
};

const updatePosts = (watchedState) => {
  const streamLoading = (feed) => {
    const urlStream = feed.url;
    return axios.get(getProxyURL(urlStream))
      .then((response) => {
        const dataStream = parseRSS(response.data.contents);
        addNewPostsInState(dataStream, feed.id, watchedState);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  };

  const promises = watchedState.feeds.map(streamLoading);
  Promise.all(promises)
    .finally(() => {
      setTimeout(updatePosts, updateInterval, watchedState);
    });
};

const runApp = (initState, i18next) => {
  const elementsDOM = {
    rssFormContainer: document.querySelector('.rss-form'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalBtnLink: document.querySelector('.full-article'),
  };

  const watchedState = watcher(initState, i18next, elementsDOM);
  createListenerForm(watchedState, elementsDOM);
  createListenerClickLink(watchedState, elementsDOM);
  setTimeout(updatePosts, updateInterval, watchedState);
};

export default runApp;
