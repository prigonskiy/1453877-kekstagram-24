import {objectsArray} from './util.js';
import {createPhotoDescription} from './data.js';

const userPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content.
  querySelector('.picture');

// Функция для вывода списка из какого-то количества миниатюр пользовательских фотографий на главной странице
const createThumbnails = (amount) => {
  const thumbnailsList = objectsArray(amount, createPhotoDescription);
  const thumbnailListFragment = document.createDocumentFragment();
  thumbnailsList.forEach(({url, likes, comments}) => {
    const thumbnailElement = pictureTemplate.cloneNode(true);
    thumbnailElement.setAttribute('href', url);
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__img').setAttribute('src', url);
    thumbnailListFragment.appendChild(thumbnailElement);
  });
  userPictures.appendChild(thumbnailListFragment);
};

export {createThumbnails};
