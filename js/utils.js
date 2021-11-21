import { RERENDER_DELAY } from './const.js';

// Функция для проверки нажатия на кнопку Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для проверки нажатия на кнопку Enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Функция для устранения "дребезга" в запросах
const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), RERENDER_DELAY);
  };
};

// Функция для поиска случайного целого числа в заданном диапазоне (включительно)
const getRandomNumber = (rangeStart, rangeEnd) => {
  if (rangeStart > rangeEnd) {
    return('Начальное значение диапазона не может быть больше конечного');
  } else if ((rangeStart < 0) || (rangeEnd < 0)) {
    return('Границы диапазона должны быть больше нуля');
  }
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
};

// Функция для сравнения длины строки с максимально допустимой длиной
const validateCommentaryLength = (commentary, maxCommentaryLength) => commentary.length <= maxCommentaryLength;

// Включение фона при открытии модального окна
const showModalBackground = () => document.querySelector('body').classList.add('modal-open');

// Выключение фона при закрытии модального окна
const hideModalBackground = () => document.querySelector('body').classList.remove('modal-open');

// Функция для проверки наличия числа среди значений элементов массива
const checkUsedNumber = (numberToCheck, arrayOfUsedNumbers) => {
  for (let counter = 0; counter < arrayOfUsedNumbers.length; counter++) {
    if (numberToCheck === arrayOfUsedNumbers[counter]) {
      return true;
    }
  }
  return false;
};

// Функция для создания уникального и случайного числа
const createUniqueRandomNumber = (rangeStart, rangeEnd, usedNumbers) => {
  while (usedNumbers) {
    const number = getRandomNumber(rangeStart, rangeEnd);
    if (!checkUsedNumber(number, usedNumbers)) {
      usedNumbers.push(number);
      return(number);
    }
  }
};

export { isEscapeKey, isEnterKey, debounce, getRandomNumber, validateCommentaryLength, showModalBackground, hideModalBackground, checkUsedNumber, createUniqueRandomNumber };
