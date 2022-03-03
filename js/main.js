const TYPES_BOOKING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIMES_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MIN_PRICE = 1500;

const MAX_PRICE = 4000;

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

const getAuthorAvatar = (avatarNumber) => {
  if (avatarNumber < 10) {
    return `img/avatars/user0${avatarNumber}.png`;
  }

  return  `img/avatars/user${avatarNumber}.png`;
};

const getListElements = (maxCount, items) => {
  const maxElements = getRandomInteger(0, maxCount);
  const AllItems= [];

  for (let i = 0; i <= maxElements - 1; i++) {
    AllItems.push(items[i]);
  }

  return AllItems;
};

const getOffer = () => {
  const locationLat = getRandomFloat (35.65000, 35.70000, 5);
  const locationLng = getRandomFloat (139.70000, 139.80000, 5);

  return [
    {
      avatar: getAuthorAvatar(getRandomFloat(1, 11))
    },
    {
      title: 'Бронируйте у нас, это выгодно',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInteger (MIN_PRICE, MAX_PRICE),
      type: TYPES_BOOKING[getRandomInteger(0, 5)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: TIMES_CHECKIN[getRandomInteger(0, 3)],
      checkout: TIMES_CHECKIN[getRandomInteger(0, 3)],
      features: getListElements(6, FEATURES_LIST),
      description: 'Чисто, уютно, комфортно',
      photos: getListElements(3, PHOTOS_LIST),
    },
    {
      lat: locationLat,
      lng: locationLng
    }
  ];
};


const getOffersList = (amountOffers) => {
  const offersList = [];
  for (let i = 0; i <= amountOffers -1; i++) {
    offersList.push(getOffer());
  }

  return offersList;
};

getOffersList(4);
