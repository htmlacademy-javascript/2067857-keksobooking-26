import {
  minPriceAmount,
  ROOM_WORDS,
  GUEST_WORDS,
  capacityGuestsOptions,
  MIN_TITLE_STRING_LENGTH,
  MAX_TITLE_STRING_LENGTH,
  timeOptions,
} from './data.js';
import { getPluralWord } from './util.js';
import { mainPinMarker } from './map-activation.js';
import { sliderElement } from './slider-creation.js';
import { sendData } from './api.js';
import {
  blockSubmitButton,
  showSuccessMessage,
  closeErrorMessage,
  showErrorMessage,
} from './submit-alert-messages.js';

const proposalForm = document.querySelector('.ad-form');
const titleField = proposalForm.querySelector('#title');
const priceField = proposalForm.querySelector('#price');
const houseTypeElements = proposalForm.querySelectorAll('[name="type"]');
const quantityRoomsElements = proposalForm.querySelectorAll('[name="rooms"]');
const capacityGuestsElements = proposalForm.querySelectorAll('[name="capacity"]');
const timeOutElements = proposalForm.querySelectorAll('[name="timeout"]');
const timeInElements = proposalForm.querySelectorAll('[name="timein"]');
const addressElement = proposalForm.querySelector('[name="address"]');

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
  return value.length >= 0 && parseInt(value, 10) >= minPriceAmount[houseTypeElements[0].value];
}

function getTypeErrorMessage() {
  return `${'от'} ${MIN_TITLE_STRING_LENGTH}
 ${'до'} ${MAX_TITLE_STRING_LENGTH} ${'символов'}`;
}

function onTypeChange() {
  priceField.placeholder = minPriceAmount[this.value];
  priceField.value = minPriceAmount[this.value];
  sliderElement.noUiSlider.set(minPriceAmount[this.value]);
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate(priceField);
}

houseTypeElements.forEach((item) => {
  item.addEventListener('change', onTypeChange);
});

function onPriceChange() {
  priceField.addEventListener('input', () => {
    sliderElement.noUiSlider.set(priceField.value);
  });
}

onPriceChange();

function onSliderRangeChange() {
  sliderElement.noUiSlider.on('change', () => {
    priceField.value = sliderElement.noUiSlider.get();
    pristine.validate(priceField);
  });
}

onSliderRangeChange();

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

function validateTime() {
  return timeOptions[timeOutElements[0].value].includes(timeOutElements[0].value);
}

function onTimeChange() {
  timeOutElements[0].value = timeOptions[this.value];
  pristine.validate(timeOutElements[0]);

  timeInElements[0].value = timeOptions[this.value];
  pristine.validate(timeInElements[0]);
}

timeInElements.forEach((item) => {
  item.addEventListener('change', onTimeChange);
});

timeOutElements.forEach((item) => {
  item.addEventListener('change', onTimeChange);
});

function getAddress() {
  mainPinMarker.on('moveend', (evt) => {
    const LatLang = evt.target.getLatLng();

    addressElement.value = `${'lat:'} ${LatLang.lat.toFixed(5)}, ${'lng:'} ${LatLang.lng.toFixed(
      5
    )}`;
  });
}

getAddress();

function addFormSubmitHandler(onSuccess) {

  proposalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccessMessage();
        },
        () => {
          showErrorMessage();
          closeErrorMessage();
        },
        new FormData(evt.target)
      );
    }
  });
}

pristine.addValidator(titleField, validateTitle, getTypeErrorMessage);
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
pristine.addValidator(quantityRoomsElements[0], validateCapacity, getCapacityErrorMessage);
pristine.addValidator(capacityGuestsElements[0], validateCapacity, getCapacityErrorMessage);
pristine.addValidator(timeOutElements[0], validateTime);
pristine.addValidator(timeOutElements[0], validateTime);

export { priceField, addFormSubmitHandler };
