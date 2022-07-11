const formElements = document.querySelector('.ad-form');
const mapFiletersElements = document.querySelector('.map__filters');

function disableForm() {
  formElements.classList.add('ad-form--disabled');
  mapFiletersElements.classList.add('map__filters--disabled');
}

window.addEventListener('load', () => {
  disableForm();
});

function enableForm() {
  formElements.classList.remove('ad-form--disabled');
  mapFiletersElements.classList.remove('map__filters--disabled');
}

enableForm();
