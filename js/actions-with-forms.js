const formElement = document.querySelector('.ad-form');
const mapFiletersElement = document.querySelector('.map__filters');

function disableForms() {
  formElement.classList.add('ad-form--disabled');
  mapFiletersElement.classList.add('map__filters--disabled');
}


disableForms();


function enableForms() {
  formElement.classList.remove('ad-form--disabled');
  mapFiletersElement.classList.remove('map__filters--disabled');
}

enableForms();
