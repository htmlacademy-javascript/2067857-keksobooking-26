const SIMILAR_PROPOSAL_COUNT = 10;

const ROOM_WORDS = ['комната', 'комнаты', 'комнат'];
const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];

const MIN_TITLE_STRING_LENGTH = '30';
const MAX_TITLE_STRING_LENGTH = '100';

const BAD_REQUEST_MESSAGE =
  'Что-то пошло не так...данные не загрузились. Попробуйте перезагрузить страницу';

const ALERT_SHOW_TIME = '5000';

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

const MainPinCoordinate = {
  LAT: 35.6938,
  LNG: 139.7034,
};

export {
  SIMILAR_PROPOSAL_COUNT,
  typesHouse,
  ROOM_WORDS,
  GUEST_WORDS,
  minPriceAmount,
  capacityGuestsOptions,
  MIN_TITLE_STRING_LENGTH,
  MAX_TITLE_STRING_LENGTH,
  timeOptions,
  MainPinCoordinate,
  BAD_REQUEST_MESSAGE,
  ALERT_SHOW_TIME,
};
