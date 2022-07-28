const proposalForm = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const formSelectedElements = document.querySelectorAll('select .ad-form__element');
const formFieldsetElements = document.querySelectorAll('fieldset .ad-form__element');
const filterSelectedElements = document.querySelectorAll('select .map__filter');
const filterFieldsetElements = document.querySelectorAll('fieldset .map__filter');

function disableForm() {
  proposalForm.classList.add('ad-form--disabled');

  formSelectedElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  formFieldsetElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

function enableForm() {
  proposalForm.classList.remove('ad-form--disabled');

  formSelectedElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  formFieldsetElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

function disableFileters() {
  mapFiltersElement.classList.add('map__filters--disabled');

  filterSelectedElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  filterFieldsetElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

function enableFilters() {
  mapFiltersElement.classList.remove('map__filters--disabled');

  filterSelectedElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  filterFieldsetElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

export { disableForm, enableForm, disableFileters, enableFilters };
