import {createObjectsArray, findElementNumber, isEscapeKey} from './util.js';
import {createPhotoDescription} from './data.js';
import {NUMBER_OF_PHOTOS} from './const.js';
import {createThumbnails} from './thumbs.js';
import {createBigPicture, openBigPictureModal, closeBigPictureModal} from './big-picture.js';

const photosArray = createObjectsArray(NUMBER_OF_PHOTOS , createPhotoDescription);

// Временно прячем относящиеся к комментариям элементы
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.social__comments-loader').classList.add('hidden');

createThumbnails(photosArray);

const picturesParent = document.querySelector('.pictures');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

picturesParent.addEventListener('click', (evt) => {
  if ((document.querySelector('.big-picture').classList.contains('hidden')) && (evt.target.closest('.picture'))) {
    evt.preventDefault();
    createBigPicture(photosArray[findElementNumber(evt.target.closest('.picture'), document.querySelectorAll('.picture'))]);
    openBigPictureModal();
    document.addEventListener('keydown', onModalEscKeydown);
    document.querySelector('.big-picture__cancel').addEventListener('click', (evt) => {
      evt.preventDefault();
      closeBigPictureModal();
    });
  }
});

