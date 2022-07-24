function getPluralWord(value, word) {
  const num = value % 10;

  if ((value > 1 && value < 5) || value === 0) {
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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getPluralWord, debounce };
