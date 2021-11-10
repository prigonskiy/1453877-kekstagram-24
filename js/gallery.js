import {createBigPicture, openBigPictureModal, closeBigPictureModal} from './big-picture.js';
import {findElementNumber, isEscapeKey} from './util.js';

// Функция, описывающая порядок действий при нажатии на ESC
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
    document.removeEventListener('keydown', onModalEscKeydown);
  }
};

const onBackgroundBigPictureClick = (evt) => {
  const bigPicture = document.querySelector('.big-picture');
  if ((!evt.target.closest('.big-picture__preview')) && (!bigPicture.classList.contains('hidden'))) {
    closeBigPictureModal();
    bigPicture.removeEventListener('click', onBackgroundBigPictureClick);
  }
};

// Функция, описывающая порядок действий при нажатии на кнопку "закрыть"
const onModalCloseClick = (evt) => {
  const bigPicture = document.querySelector('.big-picture');
  evt.preventDefault();
  closeBigPictureModal();
  bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onModalCloseClick);
};

// Функция, добавляющая обработчики события "клик" всем миниатюрам изображений на странице
const listenThumbnails = (array) => {
  const picturesParent = document.querySelector('.pictures');
  picturesParent.addEventListener('click', (evt) => {
    const bigPicture = document.querySelector('.big-picture');
    if ((bigPicture.classList.contains('hidden')) && (evt.target.closest('.picture'))) {
      evt.preventDefault();
      createBigPicture(array[findElementNumber(evt.target.closest('.picture'), document.querySelectorAll('.picture'))]);
      openBigPictureModal();
      document.addEventListener('keydown', onModalEscKeydown);
      bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onModalCloseClick);
      bigPicture.addEventListener('click', onBackgroundBigPictureClick);
    }
  });
};

export {listenThumbnails};
