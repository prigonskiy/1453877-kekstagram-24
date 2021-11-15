import {getRandomNumber, getRandomArrayElement, createUniqueRandomNumber} from './util.js';
import {NUMBER_OF_AVATARS, LIKES_MAX_LENGTH, LIKES_MIN_LENGTH} from './const.js';
import {MESSAGES, NAMES, DESCRIPTIONS} from './mocks.js';
const usedNumbers = [];

// Функция для создания одиночного объекта с комментарием пользователя
const createCommentary = () => ({
  id: createUniqueRandomNumber(usedNumbers),
  avatar: `img/avatar-${getRandomNumber(1, NUMBER_OF_AVATARS)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Функция для создания одиночного описания фотографии из произвольных данных
const createPhotoDescription = (photoID) => ({
  id: photoID + 1,
  url: `photos/${photoID + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(LIKES_MIN_LENGTH, LIKES_MAX_LENGTH),
  comments: Array.from({length: getRandomNumber(1, 5)}, createCommentary),
});

export {createPhotoDescription};
