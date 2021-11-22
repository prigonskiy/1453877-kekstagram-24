import { DEFAULT_COMMENTS_AMOUNT } from './const.js';

// Функция для удаления шаблонных комментариев из разметки
const deletePreviousComments = (commentsParent) => {
  while (commentsParent.firstChild) {
    commentsParent.removeChild(commentsParent.firstChild);
  }
};

// Функция для создания изображения аватара комментатора по внешним данным
const addCommentatorAvatar = (comment) => {
  const avatarImage = document.createElement('img');
  avatarImage.classList.add('social__picture');
  avatarImage.setAttribute('src', comment.avatar);
  avatarImage.setAttribute('alt', comment.name);
  avatarImage.setAttribute('width', '35');
  avatarImage.setAttribute('height', '35');
  return avatarImage;
};

// Функция для создания текстового содержания комментария по внешним данным
const addCommentText = (comment) => {
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  return commentText;
};

// Функция для подготовки пользовательского комментария к выводу в разметку
const createCommentary = (object) => {
  const commentsList = document.querySelector('.social__comments');
  const commentsListItem = document.createElement('li');
  commentsListItem.classList.add('social__comment');
  commentsListItem.appendChild(addCommentatorAvatar(object));
  commentsListItem.appendChild(addCommentText(object));
  commentsList.appendChild(commentsListItem);
};

// Функция для внесения комментариев в разметку
const insertComments = (array) => {
  const commentsList = document.querySelector('.social__comments');
  const createdCommentsAmount = commentsList.querySelectorAll('.social__comment').length;
  if (array.length - createdCommentsAmount <= DEFAULT_COMMENTS_AMOUNT) {
    for (let currentComment = createdCommentsAmount; currentComment < array.length; currentComment++) {
      createCommentary(array[currentComment]);
    }
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('.social__comment-count').textContent = `${array.length} из ${array.length} комментариев`;
  } else if (array.length - createdCommentsAmount > DEFAULT_COMMENTS_AMOUNT) {
    for (let currentComment = createdCommentsAmount; currentComment < DEFAULT_COMMENTS_AMOUNT + createdCommentsAmount; currentComment++) {
      createCommentary(array[currentComment]);
    }
    document.querySelector('.social__comment-count').textContent = `${createdCommentsAmount + DEFAULT_COMMENTS_AMOUNT} из ${array.length} комментариев`;
  }
};

const listenCommentsLoader = (array) => {
  document.querySelector('.comments-loader').addEventListener('click', () => {
    insertComments(array);
  });
};

// Функция для отображения изображения в полноразмерном режиме, со всеми комментариями и лайками
const createBigPictureModal = (object) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImageWrapper = bigPicture.querySelector('.big-picture__img');
  const bigPictureImage = bigPictureImageWrapper.querySelector('img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const photoDescription = bigPicture.querySelector('.social__caption');
  const commentsParent = document.querySelector('.social__comments');
  deletePreviousComments(commentsParent);
  bigPictureImage.setAttribute('src', object.url);
  likesCount.textContent = object.likes;
  photoDescription.textContent = object.description;
  insertComments(object.comments);
  listenCommentsLoader(object.comments);
};

// Костыль: пересоздание кнопки подгрузки комментариев для избавления от всех eventlistener'ов
const replaceCommentLoaderButton = () => {
  const social = document.querySelector('.social');
  const loaderButton = social.querySelector('.comments-loader');
  const clonedLoaderButton = loaderButton.cloneNode();
  clonedLoaderButton.textContent = 'Загрузить ещё';
  social.replaceChild(clonedLoaderButton, loaderButton);
};

// Функция для открытия полноэкранного режима просмотра
const openBigPictureModal = () => {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

// Функция для закрытия полноэкранного режима просмотра
const closeBigPictureModal = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  if (document.querySelector('.comments-loader').classList.contains('hidden')) {
    document.querySelector('.comments-loader').classList.remove('hidden');
  }
};

export { createBigPictureModal, openBigPictureModal, closeBigPictureModal, replaceCommentLoaderButton };
