const getRandomInteger = (min, max) => {
  if (!(Number.isInteger(min) && Number.isInteger(max))) {
    return 'Числа должны быть целыми!';
  }
  if ((min < 0) || (max < 0)) {
    return 'Введите положительные числа';
  }

  if (min === max) {
    return 'Введите разные числа';
  }

  if  (min > max) {
    return 'Неверный диапазон. Значение "от" больше значения "до"';
  }

  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomFloat = (min, max, float) => {
  if ((min < 0) || (max < 0)) {
    return 'Введите положительные числа';
  }

  if (min === max) {
    return 'Введите разные числа';
  }

  if  (min > max) {
    return 'Неверный диапазон. Значение "от" больше значения "до"';
  }

  return (Math.random() * (max - min) + min).toFixed(float);
};

const getAuthorAvatar = (avatarNumber) => (
  `img/avatars/user${avatarNumber.padStart(2, '0')}.png`
);

const getListElements = (maxCount, items) => {
  const maxElement = getRandomInteger(1, maxCount);
  const allItems = [];

  for (let i = 0; i < maxElement; i++) {
    allItems.push(items[i]);
  }

  return allItems;
};

export {getRandomInteger, getRandomFloat, getAuthorAvatar, getListElements};
