import { RERENDER_DELAY, ALERT_SHOW_TIME } from './const.js';

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

// Создание окна для оповещения пользователя об успешной отправке формы
const createSuccessWindow = () => {
  const successTemplate = document.querySelector('#success').content;
  const createSuccessWindowFragment = document.createDocumentFragment();
  createSuccessWindowFragment.appendChild(successTemplate.cloneNode(true));
  document.querySelector('body').appendChild(createSuccessWindowFragment);
  const successContainer = document.querySelector('.success');
  const successButton = successContainer.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successContainer.remove();
  });
};

// Создание окна для оповещения пользователя об ошибке при отправке формы
const createErrorWindow = () => {
  const errorTemplate = document.querySelector('#error').content;
  const createErrorWindowFragment = document.createDocumentFragment();
  createErrorWindowFragment.appendChild(errorTemplate.cloneNode(true));
  document.querySelector('body').appendChild(createErrorWindowFragment);
  const errorContainer = document.querySelector('.error');
  errorContainer.style.zIndex = '100';
  const errorButton = errorContainer.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });
};

const alertUser = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.bottom = '0';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  alertContainer.style.padding = '60px 20px';
  alertContainer.style.fontFamily = '"Open Sans", "Arial", sans-serif';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.border = '2px solid red';
  alertContainer.style.zIndex = '100';
  alertContainer.style.textTransform = 'normal';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Создание сообщения об ошибке при отправке ф

export { isEscapeKey, isEnterKey, debounce, getRandomNumber, validateCommentaryLength, showModalBackground, hideModalBackground, checkUsedNumber, createUniqueRandomNumber, createSuccessWindow, createErrorWindow, alertUser };
