import { ALERT_SHOW_TIME } from './data.js';

const successAlert = document.querySelector('#success').content.querySelector('.success');
const errorAlert = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorAlert.querySelector('.error__button');
const isEscapeKey = (evt) => evt.key === 'Escape';
const resetButton = document.querySelector('.ad-form__reset');

function showSuccessMessage() {
  document.body.append(successAlert);
}

function closeSuccessMessage() {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successAlert.classList.add('hidden');
      location.reload();
    }
  });
  document.addEventListener('click', () => {
    errorAlert.classList.add('hidden');
    location.reload();
  });
}

function showErrorMessage() {
  document.body.append(errorAlert);
  errorAlert.classList.remove('hidden');
}

function closeErrorClickHandler() {
  errorAlert.classList.add('hidden');

  document.removeEventListener('click', closeErrorClickHandler);
  document.removeEventListener('keydown', closeErrorKeydownHandler);
}

function closeErrorKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorAlert.classList.add('hidden');
    document.removeEventListener('keydown', closeErrorKeydownHandler);
    document.removeEventListener('click', closeErrorClickHandler);
  }
}

function closeErrorMessage() {
  document.addEventListener('keydown', closeErrorKeydownHandler);
  errorButton.addEventListener('click', closeErrorClickHandler);
  document.addEventListener('click', closeErrorClickHandler);
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function onResetHandler() {
  resetButton.addEventListener('click', () => {
    location.reload();
  });
}

onResetHandler();

export { closeSuccessMessage, showSuccessMessage, closeErrorMessage, showErrorMessage, showAlert };
