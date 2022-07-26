import { BAD_REQUEST_MESSAGE, GET_DATA_URL, SEND_DATA_URL } from './data.js';
import { showAlert } from './submit-alert-messages.js';

const getData = (onSuccess) =>
  fetch(GET_DATA_URL)
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
};

export { getData, sendData };
