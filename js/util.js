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

function getPluralWord(value, word) {
  const num = value % 10;

  if (value > 1 && value < 5 && value === 0) {
    return word[1];
  }
  if (num >= 5) {
    return word[2];
  }
  if (num === 1) {
    return word[0];
  }
  return word[2];
}

export { getRandomIntInclusive, getRandomArbitrary, getMixArray, getPluralWord };
