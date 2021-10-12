// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие
// фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте
// DocumentFragment.

import {objectsArray} from './util.js';
import {createPhotoDescription} from './data.js';
import {NUMBER_OF_PHOTOS} from './const.js';

const userPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content.
  querySelector('.picture');
const thumbnailsList = objectsArray(NUMBER_OF_PHOTOS, createPhotoDescription);
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

export {userPictures};
