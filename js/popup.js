import { typesHouse, ROOM_WORDS, GUEST_WORDS } from './data.js';
import { getPluralWord } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function createProposalPopup(proposals) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = proposals.author.avatar;
  cardElement.querySelector('.popup__title').textContent = proposals.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proposals.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${proposals.offer.price} /ночь`;

  cardElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${proposals.offer.checkin}, выезд до ${proposals.offer.checkout}`;

  cardElement.querySelector('.popup__description').textContent = proposals.offer.description;

  if (!proposals.offer.description) {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (!proposals.offer.features) {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  } else {
    getFeaturesElement(cardElement, proposals);
  }

  if (!proposals.offer.photos) {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  } else {
    getPhotosElement(cardElement, proposals);
  }

  getCapacityElements(cardElement, proposals);
  getHouseTypeElement(cardElement, proposals);

  return cardElement;
}

function getHouseTypeElement(cardElement, proposals) {
  cardElement.querySelector('.popup__type').innerHTML = '';

  const typeItem = document.createElement('h4');
  typeItem.textContent = typesHouse[proposals.offer.type];

  cardElement.querySelector('.popup__type').append(typeItem);
}

function getFeaturesElement(cardElement, proposals) {
  const featuresListFragment = document.createDocumentFragment();

  proposals.offer.features.forEach((feature) => {
    const cardFeatureItem = cardElement.querySelector(`.popup__feature--${feature}`);

    featuresListFragment.append(cardFeatureItem);
  });

  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').append(featuresListFragment);
}

function getPhotosElement(cardElement, proposals) {
  const photosListFragment = document.createDocumentFragment();

  for (let i = 0; i <= proposals.offer.photos.length - 1; i++) {
    const photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
    const cardPhotoElement = photoTemplate.cloneNode(true);

    cardPhotoElement.src = proposals.offer.photos[i];
    photosListFragment.append(cardPhotoElement);
  }
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').append(photosListFragment);
}

function getCapacityElements(cardElement, proposals) {
  const rooms = proposals.offer.rooms;
  const guests = proposals.offer.guests;

  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getPluralWord(
    rooms,
    ROOM_WORDS
  )} для ${guests} ${getPluralWord(guests, GUEST_WORDS)}`;
}

export { createProposalPopup };

