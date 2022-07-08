import { createProposals, typesHouse } from './data.js';
import { getNumWord } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const proposalCards = createProposals();

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
  cardElement.querySelector('.popup__description').classList.add('hidden');

  getCapacityElements(cardElement, proposal);
  getHouseTypeElement(cardElement, proposal);
  getFeaturesElement(cardElement, proposal);
  getPhotosElement(cardElement, proposal);

  mapCanvas.appendChild(cardElement);
});

function getHouseTypeElement(cardElement, proposal) {
  cardElement.querySelector('.popup__type').innerHTML = '';

  const typeArray = proposal.offer.type.split();

  typeArray.forEach((item) => {
    const typeItem = document.createElement('h4');

    typeItem.textContent = typesHouse[item];

    cardElement.querySelector('.popup__type').append(typeItem);
  });
}

function getFeaturesElement(cardElement, proposal) {
  const cardFeatureElements = cardElement.querySelectorAll('.popup__feature');

  cardFeatureElements.forEach((featuresListItem) => {
    const isNecessary = proposal.offer.features.some((feature) =>
      featuresListItem.classList.contains(`popup__feature--${feature}`)
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
    return featuresListItem;
  });
}

function getPhotosElement(cardElement, proposal) {
  cardElement.querySelector('.popup__photos').innerHTML = '';

  for (let i = 0; i <= proposal.offer.photos.length - 1; i++) {
    const PhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
    const cardPhotoElement = PhotoTemplate.cloneNode(true);

    cardPhotoElement.src = proposal.offer.photos[i];

    cardElement.querySelector('.popup__photos').append(cardPhotoElement);
  }
}

function getCapacityElements(cardElement, proposal) {
  const ROOMS = proposal.offer.rooms;
  const GUESTS = proposal.offer.guests;

  cardElement.querySelector('.popup__text--capacity').textContent = `${ROOMS} ${getNumWord(ROOMS, [
    ' комната ',
    ' комнаты ',
    ' комнат ',
  ])} для ${GUESTS}${getNumWord(GUESTS, [' гостя', ' гостей', ' гостей'])}`;
}
