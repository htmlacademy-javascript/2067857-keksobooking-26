import { createProposals, Types } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');

const cardTemaplate = document.querySelector('#card').content.querySelector('.popup');

const similarCard = createProposals();

similarCard.forEach((proposal) => {
  const cardElement = cardTemaplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = proposal.author.avatar;
  cardElement.querySelector('.popup__title').textContent = proposal.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proposal.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${proposal.offer.price} /ночь`;
  cardElement.querySelector('.popup__type').innerHTML = '';
  proposal.offer.type.split().forEach((item) => {
    const typeItem = document.createElement('h4');
    typeItem.textContent = Types[item];
    cardElement.querySelector('.popup__type').append(typeItem);
  });
  cardElement.querySelector(
    '.popup__text--capacity'
  ).textContent = `${proposal.offer.rooms} комнат для ${proposal.offer.guests} гостей`;
  cardElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после${proposal.offer.checkin}, выезд до${proposal.offer.checkout}`;
  cardElement.querySelectorAll('.popup__feature').forEach((featuresListItem) => {
    const isNecessary = proposal.offer.features.some((feature) =>
      featuresListItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
  cardElement.querySelector('.popup__description').textContent = proposal.offer.description;

  for (let image = 0; image <= proposal.offer.photos.length - 1; image++) {
    cardElement.querySelector('.popup__photo').src = proposal.offer.photos[image];
    cardElement
      .querySelector('.popup__photos')
      .append(cardElement.querySelector('.popup__photo').cloneNode(true));
  }

  mapCanvas.appendChild(cardElement);
});
