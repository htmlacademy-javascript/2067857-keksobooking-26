import {
  minPriceAmount,
  ROOM_WORDS,
  GUEST_WORDS,
  capacityGuestsOptions,
  TITLE_ERROR_MESSAGE,
  MIN_TITLE_STRING_LENGTH,
  MAX_TITLE_STRING_LENGTH,
} from './data.js';
import { getPluralWord } from './util.js';

const proposalForm = document.querySelector('.ad-form');
const titleField = proposalForm.querySelector('#title');
const priceField = proposalForm.querySelector('#price');
const houseTypeElements = proposalForm.querySelectorAll('[name="type"]');
const quantityRoomsElements = proposalForm.querySelectorAll('[name="rooms"]');
const capacityGuestsElements = proposalForm.querySelectorAll('[name="capacity"]');

const pristine = new Pristine(proposalForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error',
});

function validateTitle(value) {
  return value.length >= MIN_TITLE_STRING_LENGTH && value.length <= MAX_TITLE_STRING_LENGTH;
}

function validatePrice(value) {
  return value.length && parseInt(value, 10) >= minPriceAmount[houseTypeElements[0].value];
}

function onTypeChange() {
  priceField.placeholder = minPriceAmount[this.value];
  pristine.validate(priceField);
}

houseTypeElements.forEach((item) => {
  item.addEventListener('change', onTypeChange);
});

function getPriceErrorMessage() {
  return `Не менее ${minPriceAmount[houseTypeElements[0].value]} ₽ в выбранной категории`;
}

function validateCapacity() {
  return capacityGuestsOptions[quantityRoomsElements[0].value].includes(
    capacityGuestsElements[0].value
  );
}

function onCapacityChange() {
  quantityRoomsElements[0].placeholder = capacityGuestsOptions[this.value];
  pristine.validate(quantityRoomsElements[0]);

  capacityGuestsElements[0].placeholder = capacityGuestsOptions[this.value];
  pristine.validate(capacityGuestsElements);
}

capacityGuestsElements.forEach((item) => {
  item.addEventListener('change', onCapacityChange);
});

quantityRoomsElements.forEach((item) => {
  item.addEventListener('change', onCapacityChange);
});

function getCapacityErrorMessage() {
  return `${quantityRoomsElements[0].value}  ${getPluralWord(
    quantityRoomsElements[0].value,
    ROOM_WORDS
  )}
          ${'для '}${capacityGuestsElements[0].value} ${getPluralWord(
  capacityGuestsElements[0].value,
  GUEST_WORDS
)}
          ${':неприменимо'}`;
}

function validateForm(evt) {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }

  pristine.validate();
}

proposalForm.addEventListener('submit', (evt) => {
  validateForm(evt);
});

pristine.validate();
pristine.addValidator(titleField, validateTitle, TITLE_ERROR_MESSAGE);
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
pristine.addValidator(quantityRoomsElements[0], validateCapacity, getCapacityErrorMessage);
pristine.addValidator(capacityGuestsElements[0], validateCapacity, getCapacityErrorMessage);
