import {createProposals} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemaplate = document.querySelector('#card').content.querySelector('.popup');

const similarCard=createProposals();

similarCard.forEach((proposal) =>{
  const cardElement = cardTemaplate.cloneNode(true);
  cardElement.querySelector('img').src = proposal.author.avatar;
  cardElement.querySelector('.popup__title').textContent = proposal.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proposal.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${proposal.offer.price  } /ночь`;
  cardElement.querySelector('.popup__type').textContent = proposal.offer.type;
  // eslint-disable-next-line no-useless-concat
  cardElement.querySelector('.popup__text--capacity').textContent = `${proposal.offer.rooms  } комнат для` + ` ${  proposal.offer.guests  } гостей`;
  // eslint-disable-next-line no-useless-concat
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после${  proposal.offer.checkin  },` + ` выезд до${ proposal.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = proposal.offer.features;
  cardElement.querySelector('.popup__description').textContent = proposal.offer.description;
  cardElement.querySelector('.popup__photo').src = proposal.offer.photos;


  mapCanvas.appendChild(cardElement);
});
