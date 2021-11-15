// import {createObjectsArray} from './util.js';
// import {createPhotoDescription} from './data.js';
// import {NUMBER_OF_PHOTOS} from './const.js';
import {createThumbnails} from './thumbs.js';
import {listenThumbnails, listenUploadForm} from './gallery.js';

// const photosArray = createObjectsArray(NUMBER_OF_PHOTOS , createPhotoDescription);


fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photosArray) => {
    createThumbnails(photosArray);
    listenThumbnails(photosArray);
  });

listenUploadForm();
