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

export {getRandomIntInclusive,getRandomArbitrary,getMixArray};
