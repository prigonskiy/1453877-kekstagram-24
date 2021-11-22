import { getData } from './api.js';
import { listenFilters } from './filter.js';
import { createThumbnails } from './thumbnails.js';
import { listenThumbnails, listenUploadForm } from './gallery.js';

const startApp = async () => {
  const picturesArray = await getData();
  createThumbnails(picturesArray);
  listenThumbnails(picturesArray);
  listenFilters(picturesArray);
  listenUploadForm();
};

export { startApp, createThumbnails };
