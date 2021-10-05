import {getRandomNumber, getRandomArrayElement} from './util.js';
import {NUMBER_OF_AVATARS, LIKES_MIN, LIKES_MAX} from './const.js';
import {MESSAGES, NAMES, DESCRIPTIONS} from './mocks.js';

// Функция для проверки наличия числа среди значений элементов массива
const numberAlreadyUsed = (numberToCheck, arrayOfUsedNumbers) => {
  for (let counter = 0; counter < arrayOfUsedNumbers.length; counter++) {
    if (numberToCheck === arrayOfUsedNumbers[counter]) {
      return true;
    }
  }
  return false;
};

// Функция для создания уникального и случайного числа
const usedNumbers = [];
const uniqueRandomNumber = () => {
  while (usedNumbers) {
    const number = getRandomNumber(1, 500);
    if (!numberAlreadyUsed(number, usedNumbers)) {
      usedNumbers.push(number);
      return(number);
    }
  }
};

// Функция для создания одиночного объекта с комментарием пользователя
const createCommentary = () => ({
  id: uniqueRandomNumber(),
  avatar: `img/avatar-${getRandomNumber(1, NUMBER_OF_AVATARS)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Функция для создания одиночного описания фотографии из произвольных данных
const createPhotoDescription = (photoID) => ({
  id: photoID + 1,
  url: `photos/${photoID + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomNumber(1, 5)}, createCommentary),
});

export {createPhotoDescription};
