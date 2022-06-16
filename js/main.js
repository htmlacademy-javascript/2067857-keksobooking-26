function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if(min < 0 || max <= min) {
    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
getRandomIntInclusive(5,4);

function getRandomArbitrary(min, max) {

  if(min < 0 || max <= min){
    return;
  }

  return Math.random() * (max - min) + min;
}
getRandomArbitrary(3,6);


const AUTHOR = {

  avatar:function(){
    const createAvatar =[];
    const image = 'img/avatars/user';
    for(let i=0;i<=10;i++){
      if(i <10){
        createAvatar[i]=`${image  }0${i }.png`;}
      else {  createAvatar[i]=`${image + i }.png`;
      }
    }
    return createAvatar;
  }
};
const createAuthor = function(){
  const randomAvatarIndex = getRandomIntInclusive(0,AUTHOR.avatar().length-1);
  return{ avatar:AUTHOR.avatar()[randomAvatarIndex]};
};

const OFFER = {

  title:
    'Welcome to vacation'
  ,

  address: [
    //LOCATION.lat,
    //LOCATION.lat
  ],
  price:{
    min:500,
    max:10000},

  type: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel'],


  rooms: {
    min:1,
    max:20},
  guests :{
    min:1,
    max:60},

  checkin : [
    '12:00',
    '13:00',
    '14:00'
  ],

  checkout: [
    '12:00',
    '13:00',
    '14:00'
  ],

  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  description :
    'Incredible location,lovely restaraunt,friendly welcome, kidness staff'
  ,

  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ]
};


const LOCATION = {

  lat:{
    min:35.65000,
    max:35.70000},


  lng: {
    min:139.70000,
    max:139.80000},

};

const createProposal = function(){
  const randomPrice = getRandomIntInclusive(OFFER.price.min, OFFER.price.max);
  const randomGuests = getRandomIntInclusive(OFFER.guests.min, OFFER.guests.max);
  const randomRoom =  getRandomIntInclusive(OFFER.rooms.min, OFFER.rooms.max);
  const randomTypeIndex = getRandomIntInclusive(0,OFFER.type.length-1);
  const randomCheckinIndex = getRandomIntInclusive(0,OFFER.checkin.length-1);
  const randomCheckoutIndex = getRandomIntInclusive(0,OFFER.checkout.length-1);
  const randomFeaturesIndex = getRandomIntInclusive(0,OFFER.features.length-1);
  const randomPhotosIndex = getRandomIntInclusive(0,OFFER.photos.length-1);
  const randomLat = getRandomArbitrary(LOCATION.lat.min,LOCATION.lat.max);
  const randomLng = getRandomArbitrary(LOCATION.lng.min,LOCATION.lng.max);
  return{
    author:createAuthor(),
    title:OFFER.title,
    address:`${randomLat}, ${randomLng}`,
    price:`${randomPrice} USD`,
    type:OFFER.type[randomTypeIndex],
    rooms:randomRoom,
    guests:randomGuests,
    checkin:OFFER.checkin[randomCheckinIndex],
    checkout:OFFER.checkout[randomCheckoutIndex],
    features:OFFER.features[randomFeaturesIndex],
    description:OFFER.description,
    photos:OFFER.photos[randomPhotosIndex],
    location:`${`lat: ${randomLat}`} ${`lng: ${randomLng}`}`
  };};
createProposal();
const SIMILAR_PPROPOSAL_COUNT = 10;
// eslint-disable-next-line no-unused-vars
const createSimilarProposals = Array.from({length: SIMILAR_PPROPOSAL_COUNT}, createProposal);


