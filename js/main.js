const SIMILAR_PROPOSAL_COUNT = 10;

const AUTHOR_URL = 'img/avatars/user';

const Offer = {
  TITLE: 'Welcome to vacation',

  ADDRESS: [],

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

  DESCRIPTION: 'Incredible location,lovely restaurant,friendly welcome, kindness staff',

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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max <= min) {
    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function getRandomArbitrary(min, max) {
  if (min < 0 || max <= min) {
    return;
  }

  return Math.random() * (max - min) + min;
}

function getMixArray(array) {
  const arrayNew = array.map((index) => [Math.random(), index]);
  const arraySort = arrayNew.sort();
  const arrayMixed = arraySort.map((index) => index[1]);
  const arrayMixLength = arrayMixed.splice(getRandomIntInclusive(0, array.length - 1));

  return arrayMixLength;
}

function getAvatarArray(image) {
  const createAvatar = [];

  for (let i = 0; i <= SIMILAR_PROPOSAL_COUNT; i++) {
    if (i < 10) {
      createAvatar[i] = `${image}0${i}.png`;
    } else {
      createAvatar[i] = `${image + i}.png`;
    }
  }
  //возвращает массив с индекса 1,потому как нет картинки 00
  return createAvatar.slice(1, createAvatar.length);
}

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
      price: `${randomPrice} USD`,
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

Array.from(
  {
    length: SIMILAR_PROPOSAL_COUNT,
  },
  createProposal
);
