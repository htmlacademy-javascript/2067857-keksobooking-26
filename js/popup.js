import { createProposals, typesHouse, ROOM_WORDS, GUEST_WORDS } from './data.js';
import { getPluralWord } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const proposalCards = createProposals;

proposalCards.forEach((proposal) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = proposal.author.avatar;
  cardElement.querySelector('.popup__title').textContent = proposal.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proposal.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${proposal.offer.price} /ночь`;

  cardElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после${proposal.offer.checkin}, выезд до${proposal.offer.checkout}`;

  cardElement.querySelector('.popup__description').textContent = proposal.offer.description;

  if (!proposal.offer.description) {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  getCapacityElements(cardElement, proposal);
  getHouseTypeElement(cardElement, proposal);
  getFeaturesElement(cardElement, proposal);
  getPhotosElement(cardElement, proposal);

  mapCanvas.appendChild(cardElement);
});

function getHouseTypeElement(cardElement, proposal) {
  cardElement.querySelector('.popup__type').innerHTML = '';

  const typeItem = document.createElement('h4');
  typeItem.textContent = typesHouse[proposal.offer.type];

  cardElement.querySelector('.popup__type').append(typeItem);
}

function getFeaturesElement(cardElement, proposal) {
  const featuresListFragment = document.createDocumentFragment();

  proposal.offer.features.forEach((feature) => {
    const cardFeatureItem = cardElement.querySelector(`.popup__feature--${feature}`);

    featuresListFragment.append(cardFeatureItem);
  });

  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').append(featuresListFragment);
}

function getPhotosElement(cardElement, proposal) {
  const photosListFragment = document.createDocumentFragment();

  for (let i = 0; i <= proposal.offer.photos.length - 1; i++) {
    const photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
    const cardPhotoElement = photoTemplate.cloneNode(true);

    cardPhotoElement.src = proposal.offer.photos[i];
    photosListFragment.append(cardPhotoElement);
  }

  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').append(photosListFragment);
}

function getCapacityElements(cardElement, proposal) {
  const rooms = proposal.offer.rooms;
  const guests = proposal.offer.guests;

  cardElement.querySelector('.popup__text--capacity').textContent =
    `${rooms} ${getPluralWord(
      rooms,
      ROOM_WORDS
      // eslint-disable-next-line no-useless-concat
    )} для ` + `  ${guests} ${getPluralWord(guests, GUEST_WORDS)}`;
}
