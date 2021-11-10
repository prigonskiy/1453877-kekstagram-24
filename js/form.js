import {isEscapeKey} from './util.js';
import {HASHTAGS_SYMBOL_RESTRICTIONS, HASHTAG_MIN_LENGTH, HASHTAG_MAX_LENGTH, HASHTAGS_MAX_AMOUNT, MAX_COMMENTARY_LENGTH} from './const.js';

// Добавление классов, показывающих модальное окно загрузки изображения
const openUploadModal = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

// Удаление классов, показывающих модальное окно загрузки изображения
const closeUploadModal = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('#upload-file').value = '';
};

// Обработка инпута хэштегов
const onHashtagValueChange = () => {
  const input = document.querySelector('.text__hashtags');

  const hashtagsArray = input.value.split(' ');
  const checkedHashtagsArray = [...new Set(hashtagsArray)];

  for (let currentHashtag = 0; currentHashtag < hashtagsArray.length; currentHashtag++) {
    if (input.value === '') {
      input.setCustomValidity('');
    } else if (checkedHashtagsArray.length < hashtagsArray.length) {
      input.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else if (hashtagsArray.length > HASHTAGS_MAX_AMOUNT) {
      input.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else if (!HASHTAGS_SYMBOL_RESTRICTIONS.test(hashtagsArray[currentHashtag])) {
      input.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка) и строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    } else if (hashtagsArray[currentHashtag].length < HASHTAG_MIN_LENGTH) {
      input.setCustomValidity('Минимальная длина хэш-тега 2 символа, включая решётку');
    } else if (hashtagsArray[currentHashtag].length > HASHTAG_MAX_LENGTH) {
      input.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else {
      input.setCustomValidity('');
    }
  }
  input.reportValidity();
};

// Обработка инпута описания изображения
const onDescriptionChange = () => {
  const input = document.querySelector('.text__description');
  if (input.value.length > MAX_COMMENTARY_LENGTH) {
    input.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
};

// Функция, описывающая порядок действий при нажатии на ESC при открытом модальном окне загрузки изображения
const onImageUploadEscKeydown = (evt) => {
  const hashtagInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');
  if ((isEscapeKey(evt)) && !((document.activeElement === hashtagInput) || (document.activeElement === descriptionInput))) {
    evt.preventDefault();
    closeUploadModal();
    document.removeEventListener('keydown', onImageUploadEscKeydown);
    hashtagInput.removeEventListener('blur', onHashtagValueChange);
    descriptionInput.removeEventListener('blur', onDescriptionChange);
  }
};

// Функция, описывающая порядок действий при нажатии на кнопку "закрыть" моального окна загрузки изображения
const onImageUploadModalCloseClick = (evt) => {
  evt.preventDefault();
  closeUploadModal();
  document.removeEventListener('click', onImageUploadModalCloseClick);
  document.querySelector('.text__hashtags').removeEventListener('blur', onHashtagValueChange);
  document.querySelector('.text__description').removeEventListener('blur', onDescriptionChange);
};

// Функция, описывающая поряок действий при нажатии на контрол загрузки изображений
const onImageUploadClick = (evt) => {
  evt.preventDefault();
  openUploadModal();
  document.querySelector('#upload-cancel').addEventListener('click', onImageUploadModalCloseClick);
  document.addEventListener('keydown', onImageUploadEscKeydown);
};

// Функция, добавляющая обработчик события контролу загрузки изображений
const listenUploadForm = () => {
  document.querySelector('#upload-file').addEventListener('click', onImageUploadClick);
  document.querySelector('.text__hashtags').addEventListener('blur', onHashtagValueChange);
  document.querySelector('.text__description').addEventListener('blur', onDescriptionChange);
};

export {listenUploadForm};
