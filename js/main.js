import {createObjectsArray} from './util.js';
import {createPhotoDescription} from './data.js';
import {NUMBER_OF_PHOTOS} from './const.js';
import {createThumbnails} from './thumbs.js';
import {listenThumbnails, listenUploadForm} from './gallery.js';
// import {listenScaleControls} from './editor.js';

const photosArray = createObjectsArray(NUMBER_OF_PHOTOS , createPhotoDescription);

// Временно прячем относящиеся к комментариям элементы
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.social__comments-loader').classList.add('hidden');

createThumbnails(photosArray);
listenThumbnails(photosArray);
listenUploadForm();
