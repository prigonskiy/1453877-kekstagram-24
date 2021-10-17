import {createObjectsArray} from './util.js';
import {createPhotoDescription} from './data.js';
import {NUMBER_OF_PHOTOS} from './const.js';
import {createThumbnails} from './thumbs.js';
import {createBigPicture} from './big-picture.js';

const photosArray = createObjectsArray(NUMBER_OF_PHOTOS, createPhotoDescription);
createThumbnails(photosArray);
const pictures = document.querySelector('.pictures');
const pictureCollection = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
let currentPicture = 0;
const closeButton = bigPicture.querySelector('.big-picture__cancel');
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.social__comments-loader').classList.add('hidden');

const onThumbClick = function (evt) {
  evt.preventDefault();
  if (bigPicture.classList.contains('hidden')) {
    if (evt.target.closest('.picture'))  {
      for (let i = 0; i < pictureCollection.length; i++) {
        if (pictureCollection[i] === evt.target.closest('.picture')) {
          currentPicture = i;
          break;
        }
      }
    }
    createBigPicture(photosArray[currentPicture]);
    document.querySelector('body').classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }
};

const onCloseClick = function (evt) {
  evt.preventDefault();
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comments').innerHTML = '';
};

pictures.addEventListener('click', onThumbClick);
closeButton.addEventListener('click', onCloseClick);
