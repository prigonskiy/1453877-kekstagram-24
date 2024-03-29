import { ScaleSettings, EditorEffects } from './const.js';

const decreaseScale = (currentScale) => {
  const value = parseInt(currentScale.value, 10) > (ScaleSettings.MIN_VALUE + ScaleSettings.STEP) ? parseInt(currentScale.value, 10) - ScaleSettings.STEP : ScaleSettings.MIN_VALUE;
  currentScale.setAttribute('value', `${value}%`);
};

const increaseScale = (currentScale) => {
  const value = parseInt(currentScale.value, 10) < (ScaleSettings.MAX_VALUE - ScaleSettings.STEP) ? parseInt(currentScale.value, 10) + ScaleSettings.STEP : ScaleSettings.MAX_VALUE;
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
  effectLevel.value = EditorEffects[imageFilter].max;
  effectLevel.setAttribute('value', effectLevel.value);
  if (sliderElement.classList.contains('noUi-target')) {
    sliderElement.noUiSlider.destroy();
  }
  if (!(imageFilter === 'none')) {
    createSlider(sliderElement, EditorEffects[imageFilter]);
    sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
      effectLevel.value = unencoded[handle];
      effectLevel.setAttribute('value', unencoded);
      imagePreview.style.filter = `${EditorEffects[imageFilter].style}(${effectLevel.value}${EditorEffects[imageFilter].unit})`;
    });
  } else {
    imagePreview.style.filter = 'none';
  }
};

const setDefaultEditorValues = () => {
  const imagePreview = document.querySelector('.img-upload__preview img');
  const scaleInput = document.querySelector('.scale__control--value');
  const effectLevel = document.querySelector('#effect-level__value');
  imagePreview.style.transform = `scale(${ScaleSettings.DEFAULT_VALUE / 100})`;
  scaleInput.setAttribute('value', `${ScaleSettings.DEFAULT_VALUE}%`);
  imagePreview.style.filter = 'none';
  document.querySelector('#effect-none').checked = true;
  if (document.querySelector('.effect-level__slider').classList.contains('noUi-target')) {
    document.querySelector('.effect-level__slider').noUiSlider.destroy();
  }
  effectLevel.setAttribute('value', '');
  document.querySelector('.text__hashtags').value = '';
  document.querySelector('.text__description').value = '';
};

export {scaleImageUpload, onScaleClick, onFilterClick, setDefaultEditorValues, createSlider};
