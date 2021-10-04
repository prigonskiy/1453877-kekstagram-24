const MAX_COMMENTARY_LENGTH = 140;
const NUMBER_OF_AVATARS = 6;
const NUMBER_OF_PHOTOS = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const usedNumbers = [];

// Рандомные данные для генерирования рандомных объектов
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Леголас',
  'Фродо',
  'Гэндальф',
  'Теодред',
  'Эомунд',
  'Сэм',
  'Арагорн',
  'Арвен',
  'Галадриэль',
  'Эовин',
];
const DESCRIPTIONS = [
  'Смотрите, куда я приехал!',
  'Здесь круто!',
  'Какая вкуснота',
  'Побеждаю внедорожье!',
  'Кошки-лепёшки',
  'Где здесь туалет?',
  'Дай краба',
  'Врум-врум',
  '😐😐😐',
  '🤷‍♀️',
  '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️',
];

// Функция для поиска случайного целого числа в заданном диапазоне (включительно). Взял с MDN, что уж там :)
const getRandomNumber = function (rangeStart, rangeEnd) {
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
const getCommentaryLength = function (commentary,maxCommentaryLength) {
  return (commentary.length <= maxCommentaryLength);
};

// Функция, возвращающая произвольный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

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
  id: photoID,
  url: `photos/${photoID + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomNumber(1, 5)}, createCommentary),
});

// Функция для создания массива заданной длины из объектов
const objectsArray = (numberOfElements, objectItem) => {
  const arrayOfObjects = [];
  for (let counter = 0; counter < numberOfElements; counter++) {
    arrayOfObjects[counter] = objectItem(counter);
  }
  return arrayOfObjects;
};

getRandomNumber();
getCommentaryLength('просто пример комментария', MAX_COMMENTARY_LENGTH);
createCommentary();
objectsArray(NUMBER_OF_PHOTOS, createPhotoDescription);
