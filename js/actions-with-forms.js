import { minAmount, ROOM_WORDS, GUEST_WORDS, capacityOptions } from './data.js';
import { getPluralWord } from './util.js';

const proposalForm = document.querySelector('.ad-form');
const mapFiletersElement = document.querySelector('.map__filters');
const selectedElements = document.querySelectorAll('select');
const fieldsetElements = document.querySelectorAll('fieldset');

const priceField = proposalForm.querySelector('#price');
const capacityRooms = proposalForm.querySelector('[name="rooms"]');
const quantityGuests = proposalForm.querySelector('[name="capacity"]');
const houseTypeOptions = proposalForm.querySelector('[name="type"]');

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

function validatePrice(value) {
  return value.length && parseInt(value, 10) >= minAmount[houseTypeOptions.value];
}

function onTypeChange() {
  priceField.placeholder = minAmount[this.value];
  pristine.validate(priceField);
}

proposalForm.querySelectorAll('[name="type"]').forEach((item) => {
  item.addEventListener('change', onTypeChange);
});

function getPriceErrorMessage() {
  return `Не менее ${minAmount[houseTypeOptions.value]} ₽ в выбранной категории`;
}

function validateCapacity() {
  return capacityOptions[capacityRooms.value].includes(quantityGuests.value);
}

function onCapacityChange() {
  capacityRooms.placeholder = capacityOptions[this.value];
  pristine.validate(capacityRooms);

  quantityGuests.placeholder = capacityOptions[this.value];
  pristine.validate(quantityGuests);
}

proposalForm.querySelectorAll('[name="capacity"]').forEach((item) => {
  item.addEventListener('change', onCapacityChange);
});

proposalForm.querySelectorAll('[name="rooms"]').forEach((item) => {
  item.addEventListener('change', onCapacityChange);
});

function getCapacityErrorMessage() {
  return `${capacityRooms.value}  ${getPluralWord(capacityRooms.value, ROOM_WORDS)}
          ${'для '}${quantityGuests.value} ${getPluralWord(quantityGuests.value, GUEST_WORDS)}
          ${':неприменимо'}`;
}

proposalForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
  pristine.validate();
});

pristine.addValidator(proposalForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
pristine.addValidator(capacityRooms, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(quantityGuests, validateCapacity, getCapacityErrorMessage);
