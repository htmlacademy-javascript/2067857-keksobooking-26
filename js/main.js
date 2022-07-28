import { getData } from './api.js';
import { createProposals } from './map-activation.js';
import {
  onChangeFiltersToggler,
  onChangeFeaturesToggler,
  createProposalsFiltered,
} from './proposals-filtration.js';
import { addFormSubmitHandler } from './form-validation.js';
import { closeSuccessMessage } from './submit-alert-messages.js';
import { RERENDER_DELAY } from './data.js';
import { debounce } from './util.js';
import { uploadPropertyPhoto, uploadAvatarPhoto } from './upload-photos.js';

getData((proposals) => {
  createProposals(proposals);
  onChangeFiltersToggler(debounce(() => createProposalsFiltered(proposals), RERENDER_DELAY));
  onChangeFeaturesToggler(debounce(() => createProposalsFiltered(proposals), RERENDER_DELAY));
});

addFormSubmitHandler(closeSuccessMessage);

uploadPropertyPhoto();
uploadAvatarPhoto();
