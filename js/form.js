// Добавление классов, показывающих модальное окно загрузки изображения
const openImageUploadModal = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

// Удаление классов, показывающих модальное окно загрузки изображения
const closeImageUploadModal = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('#upload-file').value = '';
};

export {openImageUploadModal, closeImageUploadModal};
