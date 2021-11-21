// Функция для вывода списка из какого-то количества миниатюр пользовательских фотографий на главной странице
const createThumbnails = (array) => {
  const userPictures = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content.
    querySelector('.picture');
  const thumbnailListFragment = document.createDocumentFragment();
  array.forEach(({id, url, likes, comments}) => {
    const thumbnailElement = pictureTemplate.cloneNode(true);
    thumbnailElement.setAttribute('href', url);
    thumbnailElement.setAttribute('id', id);
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__img').setAttribute('src', url);
    thumbnailListFragment.appendChild(thumbnailElement);
  });
  userPictures.appendChild(thumbnailListFragment);
};

// Очищение списка миниатюр
const resetThumbnails = () => {
  const thumbnailsParent = document.querySelector('.pictures');
  const thumbnails = thumbnailsParent.querySelectorAll('.picture');
  for (let currentThumbnail = 0; currentThumbnail < thumbnails.length; currentThumbnail++) {
    thumbnailsParent.removeChild(thumbnails[currentThumbnail]);
  }
};

export {createThumbnails, resetThumbnails};
