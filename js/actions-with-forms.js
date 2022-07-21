import { onMapLoad, mapInst } from './map-activation.js';

const proposalForm = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const selectedElements = document.querySelectorAll('select');
const fieldsetElements = document.querySelectorAll('fieldset');

function disableForms() {
  proposalForm.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');

  selectedElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  fieldsetElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

disableForms();

function enableForms() {
  proposalForm.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');

  selectedElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  fieldsetElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

if (onMapLoad(mapInst)) {
  enableForms();
}
