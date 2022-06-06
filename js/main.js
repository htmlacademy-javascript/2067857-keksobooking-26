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
