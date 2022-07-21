import './actions-with-forms.js';
import { addFormSubmitHandler } from './form-validation.js';
import { closeSuccessMessage } from './submit-alert-messages.js';
import { getData } from './api.js';
import { SIMILAR_PROPOSAL_COUNT } from './data.js';
import { createMarkers } from './map-activation.js';

getData((proposals) => {
  proposals.slice(0, SIMILAR_PROPOSAL_COUNT).forEach((proposal) => {
    createMarkers(proposal);
  });
});

addFormSubmitHandler(closeSuccessMessage);
