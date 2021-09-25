const MAX_COMMENTARY_LENGTH = 140;

// Функция для поиска случайного целого числа в заданном диапазоне (включительно). Взял с MDN, что уж там :)
const getRandomNumber = function (rangeStart, rangeEnd) {
  if (rangeStart > rangeEnd) {
    return('Начальное значение диапазона не может быть больше конечного');
  } else {
    if ((rangeStart < 0) || (rangeEnd < 0)) {
      return('Границы диапазона должны быть больше нуля');
    }
  }
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
};

// Функция сравнения длины строки с максимально допустимой длиной
const getCommentaryLength = function (commentary, maxCommentaryLength) {
  return (commentary.length <= maxCommentaryLength);
};

getRandomNumber(3,5);
getCommentaryLength('просто пример комментария', MAX_COMMENTARY_LENGTH);
