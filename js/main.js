import {createObjectsArray, isEscapeKey} from './util.js';
import {createPhotoDescription} from './data.js';
import {NUMBER_OF_PHOTOS} from './const.js';
import {createThumbnails} from './thumbs.js';
import {createBigPicture} from './big-picture.js';

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.social__comments-loader').classList.add('hidden');

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const photosArray = createObjectsArray(NUMBER_OF_PHOTOS, createPhotoDescription);

createThumbnails(photosArray);

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const onCloseClick = (evt) => {
  evt.preventDefault();
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  pictures.addEventListener('click', onThumbClick);
};

const openUserModal = () => {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', onCloseClick);
};

const onThumbClick = (evt) => {
  const pictureCollection = document.querySelectorAll('.picture');
  evt.preventDefault();
  if ((bigPicture.classList.contains('hidden')) && (evt.target.closest('.picture'))) {
    for (let currentPicture = 0; currentPicture < pictureCollection.length; currentPicture++) {
      if (pictureCollection[currentPicture] === evt.target.closest('.picture')) {
        createBigPicture(photosArray[currentPicture]);
        break;
      }
    }
    openUserModal();
  }
  pictures.removeEventListener('click', onThumbClick);
};

const closeUserModal = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButton.removeEventListener('click', onCloseClick);
  pictures.addEventListener('click', onThumbClick);
};

pictures.addEventListener('click', onThumbClick);
