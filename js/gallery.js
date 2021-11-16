import {createBigPictureModal, openBigPictureModal, closeBigPictureModal} from './big-picture.js';
import {openImageUploadModal, closeImageUploadModal} from './form.js';
import {findElementNumber, isEscapeKey} from './util.js';
import {HASHTAGS_SYMBOL_RESTRICTIONS, HASHTAG_MIN_LENGTH, HASHTAG_MAX_LENGTH, HASHTAGS_MAX_AMOUNT, MAX_COMMENTARY_LENGTH} from './const.js';
import {scaleImageUpload, onScaleClick, onFilterClick, setDefaultEditorValues} from './editor.js';


// Функция, описывающая порядок действий при нажатии на ESC при открытом модальном окне полноэкранного просмотра пользовательского изображения
const onBigPictureModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
    document.removeEventListener('keydown', onBigPictureModalEscKeydown);
  }
};

// Функция, описывающая порядок действий при клике вне открытого модального окна полноэкранного просмотра пользовательского изображения
const onBigPictureModalBackgroundClick = (evt) => {
  const bigPicture = document.querySelector('.big-picture');
  if ((!evt.target.closest('.big-picture__preview')) && (!bigPicture.classList.contains('hidden'))) {
    closeBigPictureModal();
    bigPicture.removeEventListener('click', onBigPictureModalBackgroundClick);
  }
};

// Функция, описывающая порядок действий при нажатии на кнопку "закрыть" открытого модального окна полноэкранного просмотра пользовательского изображения
const onBigPictureModalCloseClick = (evt) => {
  const bigPicture = document.querySelector('.big-picture');
  evt.preventDefault();
  closeBigPictureModal();
  bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onBigPictureModalCloseClick);
};

// Функция, добавляющая обработчики события "клик" всем миниатюрам изображений на странице
const listenThumbnails = (array) => {
  const picturesParent = document.querySelector('.pictures');
  picturesParent.addEventListener('click', (evt) => {
    const bigPicture = document.querySelector('.big-picture');
    if ((bigPicture.classList.contains('hidden')) && (evt.target.closest('.picture'))) {
      evt.preventDefault();
      createBigPictureModal(array[findElementNumber(evt.target.closest('.picture'), document.querySelectorAll('.picture'))]);
      openBigPictureModal();
      document.addEventListener('keydown', onBigPictureModalEscKeydown);
      bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onBigPictureModalCloseClick);
      bigPicture.addEventListener('click', onBigPictureModalBackgroundClick);
    }
  });
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
const onImageUploadModalEscKeydown = (evt) => {
  const hashtagInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');
  if ((isEscapeKey(evt)) && !((document.activeElement === hashtagInput) || (document.activeElement === descriptionInput))) {
    evt.preventDefault();
    closeImageUploadModal();
    setDefaultEditorValues();
    document.removeEventListener('keydown', onImageUploadModalEscKeydown);
    hashtagInput.removeEventListener('blur', onHashtagValueChange);
    descriptionInput.removeEventListener('blur', onDescriptionChange);
    document.querySelector('.img-upload__scale').removeEventListener('click', onScaleClick);
    document.querySelector('.effects__list').removeEventListener('change', onFilterClick);
    document.removeEventListener('keydown', onImageUploadModalEscKeydown);
  }
};

// Функция, описывающая порядок действий при нажатии на кнопку "закрыть" моального окна загрузки изображения
const onImageUploadModalCloseClick = (evt) => {
  evt.preventDefault();
  closeImageUploadModal();
  setDefaultEditorValues();
  document.removeEventListener('click', onImageUploadModalCloseClick);
  document.querySelector('.text__hashtags').removeEventListener('blur', onHashtagValueChange);
  document.querySelector('.text__description').removeEventListener('blur', onDescriptionChange);
  document.querySelector('.img-upload__scale').removeEventListener('click', onScaleClick);
  document.querySelector('.effects__list').removeEventListener('change', onFilterClick);
  document.removeEventListener('keydown', onImageUploadModalEscKeydown);
};

// Прослушивание кнопки "опубликовать"
const setUserFormSubmit = (onSuccess) => {
  document.querySelector('#upload-select-image').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('https://24.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    ).then(() => onSuccess());
  });
};

// Функция, описывающая поряок действий при нажатии на контрол загрузки изображений
const onImageUploadModalUpload = () => {
  openImageUploadModal();
  scaleImageUpload();
  document.querySelector('#upload-cancel').addEventListener('click', onImageUploadModalCloseClick);
  document.querySelector('.text__hashtags').addEventListener('blur', onHashtagValueChange);
  document.querySelector('.text__description').addEventListener('blur', onDescriptionChange);
  document.querySelector('.img-upload__scale').addEventListener('click', onScaleClick);
  document.querySelector('.effects__list').addEventListener('change', onFilterClick);
  document.addEventListener('keydown', onImageUploadModalEscKeydown);
  setUserFormSubmit(setDefaultEditorValues());
};

// Функция, добавляющая обработчик события контролу загрузки изображений
const listenUploadForm = () => {
  document.querySelector('#upload-file').addEventListener('change', onImageUploadModalUpload);
};

export {listenThumbnails, listenUploadForm, setUserFormSubmit};
