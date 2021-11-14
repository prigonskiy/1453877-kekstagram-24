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
  const effectLevel = document.querySelector('#effect-level__value');
  imagePreview.className = `effects__preview--${imageFilter}`;
  effectLevel.value = EDITOR_EFFECTS[imageFilter].max;
  effectLevel.setAttribute('value', effectLevel.value);
  if (sliderElement.classList.contains('noUi-target')) {
    sliderElement.noUiSlider.destroy();
  }
  if (!(imageFilter === 'none')) {
    createSlider(sliderElement, EDITOR_EFFECTS[imageFilter]);
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      effectLevel.setAttribute('value', unencoded);
      switch (imageFilter) {
        case 'chrome': imagePreview.style.filter = `${EDITOR_EFFECTS[imageFilter].style}(${effectLevel.value})`; break;
        case 'sepia': imagePreview.style.filter = `${EDITOR_EFFECTS[imageFilter].style}(${effectLevel.value})`; break;
        case 'marvin': imagePreview.style.filter = `${EDITOR_EFFECTS[imageFilter].style}(${effectLevel.value}%)`; break;
        case 'phobos': imagePreview.style.filter = `${EDITOR_EFFECTS[imageFilter].style}(${effectLevel.value}px)`; break;
        case 'heat': imagePreview.style.filter = `${EDITOR_EFFECTS[imageFilter].style}(${effectLevel.value})`; break;
        default: imagePreview.style.filter = 'none'; break;
      }
    });
  } else {
    imagePreview.style.filter = 'none';
  }
};

const setDefaultEditorValues = () => {
  const imagePreview = document.querySelector('.img-upload__preview img');
  const scaleInput = document.querySelector('.scale__control--value');
  const effectLevel = document.querySelector('#effect-level__value');
  imagePreview.style.transform = `scale(${DEFAULT_SCALE_VALUE / 100})`;
  scaleInput.setAttribute('value', `${DEFAULT_SCALE_VALUE}%`);
  imagePreview.style.filter = 'none';
  document.querySelector('#effect-none').checked = true;
  if (document.querySelector('.effect-level__slider').classList.contains('noUi-target')) {
    document.querySelector('.effect-level__slider').noUiSlider.destroy();
  }
  effectLevel.setAttribute('value', '');
};

export {scaleImageUpload, onScaleClick, onFilterClick, setDefaultEditorValues, createSlider};
