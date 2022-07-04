import {SIMILAR_PROPOSAL_COUNT} from './data.js';

function getAvatarArray(image) {
  const createAvatar = [];

  for (let i = 0; i <= SIMILAR_PROPOSAL_COUNT; i++) {
    if (i < 10) {
      createAvatar[i] = `${image}0${i}.png`;
    } else {
      createAvatar[i] = `${image + i}.png`;
    }
  }
  //возвращает массив с индекса 1,потому как нет картинки под номером '00'
  return createAvatar.slice(1, createAvatar.length);
}

export {getAvatarArray};
