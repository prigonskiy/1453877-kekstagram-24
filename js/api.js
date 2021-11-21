const getData = async () => {
  try {
    const response = await fetch('https://24.javascript.pages.academy/kekstagram/data');
    if (response.ok) {
      // сюда включалку и обработчик фильтров
      return await response.json();

    }
  } catch (error) {
    // Показать диалоговое окно об ошибке
  }
};

export { getData };
