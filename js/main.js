import {createObjectsArray} from './util.js';
import {createPhotoDescription} from './data.js';
import {NUMBER_OF_PHOTOS} from './const.js';
import {createThumbnails} from './thumbs.js';
import {createBigPicture} from './big-picture.js';

const photosArray = createObjectsArray(NUMBER_OF_PHOTOS, createPhotoDescription);
createThumbnails(photosArray);
const thumbs = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');

for (let currentImage = 0; currentImage < photosArray.length; currentImage++) {
  thumbs[currentImage].addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    createBigPicture(photosArray[currentImage]);
  });
}
