import {createThumbnails} from './thumbs.js';
import {listenThumbnails, listenUploadForm} from './gallery.js';

fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photosArray) => {
    createThumbnails(photosArray);
    listenThumbnails(photosArray);
  });

listenUploadForm();
