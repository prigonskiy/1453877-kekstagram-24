// Функция для поиска случайного целого числа в заданном диапазоне (включительно). Взял с MDN, что уж там :)
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
const getCommentaryLength = (commentary, maxCommentaryLength) => commentary.length <= maxCommentaryLength;

// Функция, возвращающая произвольный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Функция для создания массива заданной длины из объектов
const objectsArray = (numberOfElements, objectItem) => {
  const arrayOfObjects = [];
  for (let counter = 0; counter < numberOfElements; counter++) {
    arrayOfObjects[counter] = objectItem(counter);
  }
  return arrayOfObjects;
};

export {getRandomNumber, getCommentaryLength, getRandomArrayElement, objectsArray};
