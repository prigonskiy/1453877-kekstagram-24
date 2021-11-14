// Основные константы в проекте
export const MAX_COMMENTARY_LENGTH = 140;
export const NUMBER_OF_AVATARS = 6;
export const NUMBER_OF_PHOTOS = 25;
export const LIKES_MIN_LENGTH = 15;
export const LIKES_MAX_LENGTH = 200;
export const HASHTAGS_SYMBOL_RESTRICTIONS = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19})$/;
export const HASHTAG_MIN_LENGTH = 2;
export const HASHTAG_MAX_LENGTH = 20;
export const HASHTAGS_MAX_AMOUNT = 5;
export const SCALE = {step: 25, min: 0, max: 100};
export const DEFAULT_SCALE_VALUE = 55;
export const EDITOR_EFFECTS = {
  'original': {style: 'none', min: 0, max: 1, step: 1},
  'chrome': {style: 'grayscale', min: 0, max: 1, step: 0.1},
  'sepia': {style: 'sepia', min: 0, max: 1, step: 0.1},
  'marvin': {style: 'invert', min: 0, max: 100, step: 1},
  'phobos': {style: 'blur', min: 0, max: 3, step: 0.1},
  'heat': {style: 'brightness', min: 1, max: 3, step: 0.1},
};

