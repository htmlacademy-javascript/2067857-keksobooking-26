import {
  minPriceAmount,
  ROOM_WORDS,
  GUEST_WORDS,
  capacityGuestsOptions,
  TITLE_ERROR_MESSAGE,
} from './data.js';
import { getPluralWord } from './util.js';

const proposalForm = document.querySelector('.ad-form');
const mapFiletersElement = document.querySelector('.map__filters');
const selectedElements = document.querySelectorAll('select');
const fieldsetElements = document.querySelectorAll('fieldset');

const titleField = proposalForm.querySelector('#title');
const priceField = proposalForm.querySelector('#price');
const quantityRooms = proposalForm.querySelector('[name="rooms"]');
const capacityGuests = proposalForm.querySelector('[name="capacity"]');
const houseTypeOptions = proposalForm.querySelector('[name="type"]');
const quantityRoomsElements = proposalForm.querySelectorAll('[name="rooms"]');
const capacityGuestsElements = proposalForm.querySelectorAll('[name="capacity"]');
const houseTypeElements = proposalForm.querySelectorAll('[name="type"]');

const pristine = new Pristine(proposalForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error',
});

function disableForms() {
  proposalForm.classList.add('ad-form--disabled');
  mapFiletersElement.classList.add('map__filters--disabled');

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
  mapFiletersElement.classList.remove('map__filters--disabled');

  selectedElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  fieldsetElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

enableForms();

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.validate();

function validatePrice(value) {
  return value.length && parseInt(value, 10) >= minPriceAmount[houseTypeOptions.value];
}

function onTypeChange() {
  priceField.placeholder = minPriceAmount[this.value];
  pristine.validate(priceField);
}

houseTypeElements.forEach((item) => {
  item.addEventListener('change', onTypeChange);
});

function getPriceErrorMessage() {
  return `Не менее ${minPriceAmount[houseTypeOptions.value]} ₽ в выбранной категории`;
}

function validateCapacity() {
  return capacityGuestsOptions[quantityRooms.value].includes(capacityGuests.value);
}

function onCapacityChange() {
  quantityRooms.placeholder = capacityGuestsOptions[this.value];
  pristine.validate(quantityRooms);

  capacityGuests.placeholder = capacityGuestsOptions[this.value];
  pristine.validate(capacityGuests);
}

capacityGuestsElements.forEach((item) => {
  item.addEventListener('change', onCapacityChange);
});

quantityRoomsElements.forEach((item) => {
  item.addEventListener('change', onCapacityChange);
});

function getCapacityErrorMessage() {
  return `${quantityRooms.value}  ${getPluralWord(quantityRooms.value, ROOM_WORDS)}
          ${'для '}${capacityGuests.value} ${getPluralWord(capacityGuests.value, GUEST_WORDS)}
          ${':неприменимо'}`;
}

function applyPreventDefault(evt) {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
}

proposalForm.addEventListener('submit', (evt) => {
  applyPreventDefault(evt);

  pristine.validate();
});

pristine.addValidator(titleField, validateTitle, TITLE_ERROR_MESSAGE);
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
pristine.addValidator(quantityRooms, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorMessage);
