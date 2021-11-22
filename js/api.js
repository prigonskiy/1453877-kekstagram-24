import { createSuccessWindow, createErrorWindow, alertUser } from './utils.js';

const getData = async () => {
  try {
    const response = await fetch('https://24.javascript.pages.academy/kekstagram/data');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    alertUser('Не удаётся загрузить информацию. Перезагрузите страницу');
  }
};

// Отправить форму
const sendData = (onSuccess, onFail, body) =>{
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        createSuccessWindow();
      } else {
        createErrorWindow();
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
