import {DEFAULT_SCALE_VALUE, EDITOR_EFFECTS, SCALE} from './const.js';

const decreaseScale = (currentScale) => {
  const value = parseInt(currentScale.value, 10) > (SCALE.min + SCALE.step) ? parseInt(currentScale.value, 10) - SCALE.step : SCALE.min;
  currentScale.setAttribute('value', `${value}%`);
};

const increaseScale = (currentScale) => {
  const value = parseInt(currentScale.value, 10) < (SCALE.max - SCALE.step) ? parseInt(currentScale.value, 10) + SCALE.step : SCALE.max;
  currentScale.setAttribute('value', `${value}%`);
};

const scaleImageUpload = () => {
  const scaleInput = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview img');
  imagePreview.style.transform = `scale(${(parseInt(scaleInput.value, 10)) / 100})`;
};

const onScaleClick = (evt) => {
  evt.preventDefault();
  const scaleInput = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview img');
  if (evt.target.closest('.scale__control--smaller')) {
    decreaseScale(scaleInput);
  } else if (evt.target.closest('.scale__control--bigger')) {
    increaseScale(scaleInput);
  }
  imagePreview.style.transform = `scale(${(parseInt(scaleInput.value, 10)) / 100})`;
};

const createSlider = (slider, effect) => {
  noUiSlider.create(slider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower',
  });
};

const onFilterClick = (evt) => {
  const imageFilter = evt.target.value;
  const imagePreview = document.querySelector('.img-upload__preview img');
  const sliderElement = document.querySelector('.effect-level__slider');
  imagePreview.className = `effects__preview--${imageFilter}`;
  if (sliderElement.classList.contains('noUi-target')) {
    sliderElement.noUiSlider.destroy();
  }
  // createSlider(sliderElement, EDITOR_EFFECTS[imageFilter]);
  if (!(imageFilter === 'none')) {
    createSlider(sliderElement, EDITOR_EFFECTS[imageFilter]);
  }
};

const setDefaultEditorValues = () => {
  const imagePreview = document.querySelector('.img-upload__preview img');
  const scaleInput = document.querySelector('.scale__control--value');
  imagePreview.className = 'none';
  imagePreview.style.transform = `scale(${DEFAULT_SCALE_VALUE / 100})`;
  scaleInput.setAttribute('value', `${DEFAULT_SCALE_VALUE}%`);
  document.querySelector('#effect-none').checked = true;
  if (document.querySelector('.effect-level__slider').classList.contains('noUi-target')) {
    document.querySelector('.effect-level__slider').noUiSlider.destroy();
  }
};

// const sliderElement = document.querySelector('.effect-level__slider');
// const imageFilter = EDITOR_EFFECTS['chrome'];
// // createSlider(sliderElement, EDITOR_EFFECTS[imageFilter]);


// const listenSlider = () => {
//   const sliderElement = document.querySelector('.effect-level__slider');
//   createSlider(sliderElement, EDITOR_EFFECTS.SEPIA.min, EDITOR_EFFECTS.SEPIA.max, EDITOR_EFFECTS.SEPIA.max, EDITOR_EFFECTS.SEPIA.step);
// };

// const listenSlider = () => {
//   const sliderElement = document.querySelector('.effect-level__slider');
//   sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
//     console.log(unencoded[handle]);
//   });
// };

// createSlider = (EDITOR_VALUES.MIN_VALUE, EDITOR_VALUES.MAX_VALUE, )


// const createEffectSlider = () => {
//   const sliderElement = document.querySelector('.effect-level__slider');
//   const effectOriginal = document.querySelector('#effect-none');
//   const effectChrome = document.querySelector('#effect-chrome');
//   const effectSepia = document.querySelector('#effect-sepia');
//   const effectMarvin = document.querySelector('#effect-marvin');
//   const effectPhobos = document.querySelector('#effect-phobos');
//   const effectHeat = document.querySelector('#effect-heat');
//   const effectLevel = document.querySelector('#effect-level__value');
//   const uploadedImageContainer = document.querySelector('.img-upload__preview');
//   const uploadedImage = uploadedImageContainer.querySelector('img');

//   noUiSlider.create(sliderElement, {
//     range: {
//       min: 0,
//       max: 100,
//     },
//     start: 0,
//     step: 1,
//     connect: 'lower',
//   });

//   sliderElement.noUiSlider.on('update', (values, handle) => {
//     effectLevel.value = values[handle];
//   });

//   slider.noUiSlider.on('update', (__, handle, unencoded) => {
//     effectLevel.value = unencoded[handle];
//     effectLevel.setAttrubute('value', unencoded);
//     if (effectOriginal.checked) {
//       slider.classList.add('hidden');
//     } if (effectChrome.checked) {
//       slider.classList.remove('hidden');
//       uploadedImage.style.filter = `grayscale(${effectLevel.value})`;
//     } if (effectSepia.checked) {
//       slider.classList.remove('hidden');
//       uploadedImage.style.filter = `sepia(${effectLevel.value})`;
//     } if (effectMarvin.checked) {
//       slider.classList.remove('hidden');
//       uploadedImage.style.filter = `invert(${effectLevel.value / 100})`;
//     } if (effectPhobos.checked) {
//       slider.classList.remove('hidden');
//       uploadedImage.style.filter = `blur(${effectLevel.value}px)`;
//     } if (effectHeat.checked) {
//       slider.classList.remove('hidden');
//       uploadedImage.style.filter = `brightness(${effectLevel.value})`;
//     }
//   });
// };

export {scaleImageUpload, onScaleClick, onFilterClick, setDefaultEditorValues, createSlider};
