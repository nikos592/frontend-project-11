import _ from 'lodash';
import onChange from 'on-change';

export default (state, i18next, elementsDOM) => {
  const getTitle = (title) => (title === null ? i18next.t('emptyTitle') : title);

  const renderFeedback = () => {
    const feedbackElement = elementsDOM.rssFormContainer.querySelector('.feedback');
    if (state.validStatus === 'success' && state.streamLoadingStatus === 'success') {
      feedbackElement.classList.remove('text-danger');
      feedbackElement.classList.add('text-success');
      feedbackElement.textContent = i18next.t('feedbackMessage.successMsg');
      elementsDOM.rssFormContainer.reset();
    }
    if (state.validStatus === 'error' || state.streamLoadingStatus === 'error') {
      feedbackElement.classList.remove('text-success');
      feedbackElement.classList.add('text-danger');
      feedbackElement.textContent = i18next.t(`feedbackMessage.${state.errorMsgFeedback}`);
    }
    elementsDOM.rssFormContainer.querySelector('input').focus();
  };

  const renderBlockForm = () => {
    if (state.streamLoadingStatus === 'loading') {
      elementsDOM.rssFormContainer.querySelector('input').setAttribute('readonly', '');
      document.querySelector('button[type=submit]').setAttribute('disabled', 'disabled');
    } else {
      elementsDOM.rssFormContainer.querySelector('input').removeAttribute('readonly', '');
      document.querySelector('button[type=submit]').removeAttribute('disabled', 'disabled');
      renderFeedback();
    }
  };

  const renderVisitedLink = (visitedPosts) => {
    const visitedLastPostId = visitedPosts[visitedPosts.length - 1];
    document.querySelector(`a[data-id="${visitedLastPostId}"]`).setAttribute('class', 'fw-normal');
  };

  const renderOpenModal = (postId) => {
    const dataPost = _.find(state.posts, { id: postId });
    const title = getTitle(dataPost.title, i18next);
    /* eslint-disable no-param-reassign */
    elementsDOM.modalTitle.textContent = title;
    elementsDOM.modalBody.textContent = dataPost.description;
    elementsDOM.modalBtnLink.setAttribute('href', dataPost.link);
  };

  const renderFeeds = () => {
    const headingFeeds = document.createElement('h2');
    headingFeeds.textContent = i18next.t('feeds');

    const feedsList = document.createElement('ul');
    feedsList.setAttribute('class', 'list-group');

    state.feeds.forEach((feed) => {
      const feedElement = document.createElement('li');
      feedElement.setAttribute('class', 'list-group-item');
      const title = getTitle(feed.title, i18next);

      const feedTitle = document.createElement('h3');
      feedTitle.textContent = title;
      const feedDescription = document.createElement('p');
      feedDescription.textContent = feed.description;

      feedElement.append(feedTitle);
      feedElement.append(feedDescription);
      feedsList.append(feedElement);
    });
    elementsDOM.feedsContainer.innerHTML = '';
    elementsDOM.feedsContainer.prepend(feedsList);
    elementsDOM.feedsContainer.prepend(headingFeeds);
  };
    /* eslint-disable no-param-reassign */
  const renderPosts = () => {
    const headingPosts = document.createElement('h2');
    headingPosts.textContent = i18next.t('posts');

    const postsList = document.createElement('ul');
    postsList.classList.add('list-group');

    state.posts.forEach((post) => {
      const postElement = document.createElement('li');
      postElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

      const visitedLink = _.includes(state.uiState.visitedPosts, post.id);
      const classLink = visitedLink ? 'fw-normal' : 'fw-bold';

      const linkElement = document.createElement('a');
      linkElement.href = post.link;
      linkElement.classList.add(classLink, 'fw-bold');
      linkElement.dataset.id = post.id;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      linkElement.textContent = getTitle(post.title, i18next);

      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.classList.add('btn', 'btn-primary', 'btn-sm');
      buttonElement.dataset.id = post.id;
      buttonElement.dataset.bsToggle = 'modal';
      buttonElement.dataset.bsTarget = '#modal';
      buttonElement.textContent = i18next.t('modalButtonName');

      postElement.append(linkElement, buttonElement);
      postsList.prepend(postElement);
    });

    elementsDOM.postsContainer.innerHTML = '';
    elementsDOM.postsContainer.append(headingPosts, postsList);
  };

  return onChange(state, (path, value) => {
    switch (path) {
      case 'feeds': {
        renderFeeds();
        break;
      }
      case 'posts': {
        renderPosts();
        break;
      }
      case 'streamLoadingStatus': {
        renderBlockForm();
        break;
      }
      case 'validStatus': {
        renderFeedback();
        break;
      }
      case 'uiState.visitedPosts': {
        renderVisitedLink(value);
        break;
      }
      case 'uiState.modalPostId': {
        renderOpenModal(value);
        break;
      }
      default: {
        break;
      }
    }
  });
};
