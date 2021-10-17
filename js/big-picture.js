const bigPicture = document.querySelector('.big-picture');
const bigPictureImageWrapper = bigPicture.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageWrapper.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');

while (commentsList.firstChild) {
  commentsList.removeChild(commentsList.firstChild);
}

const insertComments = (array) => {
  for (let currentComment = 0; currentComment < array.length; currentComment++) {
    const commentsListItem = document.createElement('li');
    commentsListItem.classList.add('social__comment');
    commentsList.appendChild(commentsListItem);

    const avatarImage = document.createElement('img');
    avatarImage.classList.add('social__picture');
    avatarImage.setAttribute('src', array[currentComment].avatar);
    avatarImage.setAttribute('alt', array[currentComment].name);
    avatarImage.setAttribute('width', '35');
    avatarImage.setAttribute('height', '35');
    commentsListItem.appendChild(avatarImage);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = array[currentComment].message;
    commentsListItem.appendChild(commentText);
  }
};

const createBigPicture = (object) => {
  bigPictureImage.setAttribute('src', object.url);
  likesCount.textContent = object.likes;
  commentsCount.textContent = object.comments.length;
  photoDescription.textContent = object.description;
  insertComments(object.comments);
};

export {createBigPicture};
