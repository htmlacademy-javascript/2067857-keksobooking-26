import { BAD_REQUEST_MESSAGE } from './data.js';
import { showAlert } from './submit-alert-messages.js';

const getData = (onSuccess) =>
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(BAD_REQUEST_MESSAGE);
      }
    })
    .then((proposals) => {
      onSuccess(proposals);
    })
    .catch(() => {
      showAlert(BAD_REQUEST_MESSAGE);
    });

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
