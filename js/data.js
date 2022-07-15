import { getRandomIntInclusive, getRandomArbitrary, getMixArray } from './util.js';
import { getAvatarArray } from './additional-functions.js';

const SIMILAR_PROPOSAL_COUNT = 1;

const AUTHOR_URL = 'img/avatars/user';

const ROOM_WORDS = ['комната', 'комнаты', 'комнат'];
const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];

const MIN_TITLE_STRING_LENGTH = '30';
const MAX_TITLE_STRING_LENGTH = '100';

const typesHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const capacityGuestsOptions = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const minPriceAmount = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const timeOptions = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00',
};

const Offer = {
  TITLE: 'Welcome to vacation',

  PRICE: {
    min: 500,
    max: 10000,
  },

  HOUSE_TYPE: ['palace', 'flat', 'house', 'bungalow', 'hotel'],

  ROOMS: {
    min: 1,
    max: 20,
  },

  GUESTS: {
    min: 1,
    max: 60,
  },

  CHECKIN: ['12:00', '13:00', '14:00'],

  CHECKOUT: ['12:00', '13:00', '14:00'],

  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

  DESCRIPTION: ['Incredible location,lovely restaurant,friendly welcome, kindness staff'],

  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const Location = {
  LAT: {
    min: 35.65,
    max: 35.7,
  },

  LNG: {
    min: 139.7,
    max: 139.8,
  },
};

const createProposals = Array.from({ length: SIMILAR_PROPOSAL_COUNT }, createProposal);

function createProposal() {
  const randomAvatarIndex = getRandomIntInclusive(0, getAvatarArray(AUTHOR_URL).length - 1);
  const randomPrice = getRandomIntInclusive(Offer.PRICE.min, Offer.PRICE.max);
  const randomGuests = getRandomIntInclusive(Offer.GUESTS.min, Offer.GUESTS.max);
  const randomRoom = getRandomIntInclusive(Offer.ROOMS.min, Offer.ROOMS.max);
  const randomHouseTypeIndex = getRandomIntInclusive(0, Offer.HOUSE_TYPE.length - 1);
  const randomCheckinIndex = getRandomIntInclusive(0, Offer.CHECKIN.length - 1);
  const randomCheckoutIndex = getRandomIntInclusive(0, Offer.CHECKOUT.length - 1);
  const randomLat = getRandomArbitrary(Location.LAT.min, Location.LAT.max);
  const randomLng = getRandomArbitrary(Location.LNG.min, Location.LNG.max);
  const getRandomFeaturesArray = getMixArray(Offer.FEATURES);
  const getRandomPhotosArray = getMixArray(Offer.PHOTOS);

  return {
    author: {
      avatar: getAvatarArray(AUTHOR_URL)[randomAvatarIndex],
    },
    offer: {
      title: Offer.TITLE,
      address: `${randomLat}, ${randomLng}`,
      price: `${randomPrice} ₽`,
      type: Offer.HOUSE_TYPE[randomHouseTypeIndex],
      rooms: randomRoom,
      guests: randomGuests,
      checkin: Offer.CHECKIN[randomCheckinIndex],
      checkout: Offer.CHECKOUT[randomCheckoutIndex],
      description: Offer.DESCRIPTION,
      features: getRandomFeaturesArray,
      photos: getRandomPhotosArray,
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
}

export {
  SIMILAR_PROPOSAL_COUNT,
  createProposals,
  typesHouse,
  ROOM_WORDS,
  GUEST_WORDS,
  minPriceAmount,
  capacityGuestsOptions,
  MIN_TITLE_STRING_LENGTH,
  MAX_TITLE_STRING_LENGTH,
  timeOptions,
};
