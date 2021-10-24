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

// Функция для внесения комментариев в разметку
const insertComments = (array, bigPictureTemplate) => {
  const commentsList = bigPictureTemplate.querySelector('.social__comments');
  deletePreviousComments(commentsList);
  for (let currentComment = 0; currentComment < array.length; currentComment++) {
    const commentsListItem = document.createElement('li');
    commentsListItem.classList.add('social__comment');
    commentsListItem.appendChild(addCommentatorAvatar(array[currentComment]));
    commentsListItem.appendChild(addCommentText(array[currentComment]));
    commentsList.appendChild(commentsListItem);
  }
};

// Функция для отображения изображения в полноразмерном режиме, со всеми комментариями и лайками
const createBigPicture = (object) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImageWrapper = bigPicture.querySelector('.big-picture__img');
  const bigPictureImage = bigPictureImageWrapper.querySelector('img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const photoDescription = bigPicture.querySelector('.social__caption');
  bigPictureImage.setAttribute('src', object.url);
  likesCount.textContent = object.likes;
  commentsCount.textContent = object.comments.length;
  photoDescription.textContent = object.description;
  insertComments(object.comments, bigPicture);
};

export {createBigPicture};
