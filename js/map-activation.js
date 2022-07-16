import { proposalCards, createProposalPopup } from './popup.js';

const map = L.map('map-canvas').setView(
  {
    lat: 35.6938,
    lng: 139.7034,
  },
  10
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mapLoaded = () => map.on('load');

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
    lat: 35.6938,
    lng: 139.7034,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (proposal) => {
  const marker = L.marker(
    {
      lat: proposal.location.lat,
      lng: proposal.location.lng,
    },
    {
      icon,
    }
  );
  marker.addTo(markerGroup).bindPopup(createProposalPopup(proposal));
};

proposalCards.forEach((proposal) => {
  createMarkers(proposal);
});

export { mainPinMarker, mapLoaded, markerGroup };
