import { resetThumbnails } from './thumbnails.js';
import { PicturesFilterAmount } from './const.js';
import { createUniqueRandomNumber, debounce } from './utils.js';
import { createThumbnails } from './thumbnails.js';
import { listenThumbnails } from './gallery.js';

// Включение блока фильтров
const showFiltersBlock = () => document.querySelector('.img-filters').classList.remove('img-filters--inactive');

// Сортировка и подрезание исходного массива с фотографиями для фильтра "Случайные"
const getRandomPictures = (array) => {
  const usedNumbers = [];
  const randomPictures = [];
  for (let currentPicture = 0; currentPicture < PicturesFilterAmount.RANDOM; currentPicture++) {
    randomPictures[currentPicture] = array[createUniqueRandomNumber(1, array.length - 1, usedNumbers)];
  }
  return randomPictures;
};

// Функция для организации сортировки изображений по убыванию
const compareCommentaryAmountDecrease = (firstPicture, secondPicture) => {
  if (firstPicture.comments < secondPicture.comments) {
    return 1;
  } else if (firstPicture.comments > secondPicture.comments) {
    return -1;
  }
  return 0;
};

// Сортировка исходного массива с фотографиями для фильтра "Обсуждаемые"
const getSortedByDecreaseDiscussedPictures = (array) => {
  const sortedArray = array.slice().sort(compareCommentaryAmountDecrease);
  return sortedArray;
};

// Устранение дребезга при перерисовке списка миниатюр по нажатию на фильтр
const createThumbnailsWithDelay = debounce((array) => {
  createThumbnails(array);
  listenThumbnails(array);
});

// Функция для работы со списком фильтров
const listenFilters = (array) => {
  showFiltersBlock();
  const filtersParent = document.querySelector('.img-filters__form');
  filtersParent.addEventListener('click', (evt) => {
    if ((evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) || (evt.target.closest('#filter-random'))) {
      evt.preventDefault();
      resetThumbnails();
      filtersParent.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.closest('.img-filters__button').classList.add('img-filters__button--active');
      if (evt.target.closest('#filter-default')) {
        createThumbnailsWithDelay(array);
      } else if (evt.target.closest('#filter-random')) {
        createThumbnailsWithDelay(getRandomPictures(array));
      } else if (evt.target.closest('#filter-discussed')) {
        createThumbnailsWithDelay(getSortedByDecreaseDiscussedPictures(array));
      }
    }
  });
};

export { listenFilters };
