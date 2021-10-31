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
const limitCommentaryLength = (commentary, maxCommentaryLength) => commentary.length <= maxCommentaryLength;

// Функция, возвращающая произвольный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Функция для создания массива заданной длины из объектов
const createObjectsArray = (numberOfElements, objectItem) => {
  const arrayOfObjects = [];
  for (let counter = 0; counter < numberOfElements; counter++) {
    arrayOfObjects[counter] = objectItem(counter);
  }
  return arrayOfObjects;
};

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
const createUniqueRandomNumber = (usedNumbers) => {
  while (usedNumbers) {
    const number = getRandomNumber(1, 500);
    if (!checkUsedNumber(number, usedNumbers)) {
      usedNumbers.push(number);
      return(number);
    }
  }
};

// Функция для проверки нажатия на кнопку Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для проверки нажатия на кнопку Enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Функция для нахождения номера выбранного элемента коллекции
const findElementNumber = (element, collection) => {
  for (let currentElement = 0; currentElement < collection.length; currentElement++) {
    if (element === collection[currentElement]) {
      return currentElement;
    }
  }
};

export {getRandomNumber, limitCommentaryLength, getRandomArrayElement, createObjectsArray, createUniqueRandomNumber, isEscapeKey, isEnterKey, findElementNumber};
