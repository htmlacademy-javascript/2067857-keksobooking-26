import { BAD_REQUEST_MESSAGE, GET_DATA_URL, SEND_DATA_URL } from './data.js';
import { showAlert } from './submit-alert-messages.js';
import { disableFileters } from './actions-with-forms.js';

function getData(onSuccess) {
  return fetch(GET_DATA_URL)
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
      disableFileters();
      showAlert(BAD_REQUEST_MESSAGE);
    });
}

function sendData(onSuccess, onFail, body) {
  fetch(SEND_DATA_URL, {
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
}

export { getData, sendData };
