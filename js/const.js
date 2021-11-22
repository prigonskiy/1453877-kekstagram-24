export const MAX_COMMENTARY_LENGTH = 140;
export const RERENDER_DELAY = 500;
export const DEFAULT_COMMENTS_AMOUNT = 5;
export const ALERT_SHOW_TIME = 100000;

export const PicturesFilterAmount = {
  DEFAULT: 25,
  RANDOM: 10,
  DISCUSSED: 25,
};

export const ScaleSettings = {
  STEP: 25,
  MIN_VALUE: 0,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 55,
};

export const HashtagsRestrictions = {
  CHARACTERS: /(^#[A-Za-zА-Яа-яЁё0-9]{1,19})$/,
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_AMOUNT: 5,
};

export const EditorEffects = {
  'none': {style: 'none', min: 0, max: 1, step: 1, unit: ''},
  'chrome': {style: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  'sepia': {style: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  'marvin': {style: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  'phobos': {style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  'heat': {style: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

export const FileTypes = ['gif', 'jpg', 'jpeg', 'png'];
