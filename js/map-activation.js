import { createProposalPopup } from './popup.js';
import { MainPinCoordinate } from './data.js';
import { disableForm, enableForm, disableFileters, enableFilters } from './actions-with-forms.js';
import { SIMILAR_PROPOSAL_COUNT } from './data.js';

disableForm();
disableFileters();

const map = L.map('map-canvas').on('load', enableForm, enableFilters());

map.setView(
  {
    lat: MainPinCoordinate.LAT,
    lng: MainPinCoordinate.LNG,
  },
  12
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: MainPinCoordinate.LAT,
    lng: MainPinCoordinate.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

function createMarkers(proposals) {
  const marker = L.marker(
    {
      lat: proposals.location.lat,
      lng: proposals.location.lng,
    },
    {
      icon,
    }
  );
  marker.addTo(markerGroup).bindPopup(createProposalPopup(proposals));
}

function createProposals(proposals) {
  proposals.slice(0, SIMILAR_PROPOSAL_COUNT).forEach((proposal) => {
    createMarkers(proposal);
  });
}

export { mainPinMarker, createMarkers, markerGroup, createProposals };
