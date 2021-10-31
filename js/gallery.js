import {createBigPicture, openBigPictureModal, closeBigPictureModal} from './big-picture.js';
import {findElementNumber, isEscapeKey} from './util.js';

// Функция, описывающая порядок действий при нажатии на ESC
const onModalEscKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

// Функция, описывающая порядок действий при нажатии на кнопку "закрыть"
const onModalCloseClick = (evt) => {
  evt.preventDefault();
  closeBigPictureModal();
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
    }
  });
};

export {listenThumbnails};
