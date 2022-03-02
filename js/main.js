function returnRandomInteger (min, max) {
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
}

function returnRandomFloat (min, max, float) {
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
}

const typeBooking = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const checkinCheckoutTime = [
  '12:00',
  '13:00',
  '14:00'
];

const featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const photosList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getAuthorAvatar = (number) => {
  if (number < 10) {
    return `img/avatars/user0${number}.png`;
  }

  return 'img/avatars/user' + number + '.png';
};

const getArrayElements = (maxQuantity, array) => {
  const arrayLength = returnRandomInteger(0, maxQuantity);
  const totlalArray = [];

  for (let i = 0; i <= arrayLength; i++) {
    totlalArray.push(array[i]);
  }

  return totlalArray;
};

const createOffer = () => {
  const locationLat = returnRandomFloat (35.65000, 35.70000, 5);
  const locationLng = returnRandomFloat (139.70000, 139.80000, 5);

  return [
    {
      avatar: getAuthorAvatar(returnRandomInteger(1, 11))
    },
    {
      title: 'БРОНИРУЙТЕ У НАС, ЭТО ВЫГОДНО',
      address: locationLat + ', ' + locationLng,
      price: returnRandomInteger (1500, 4000),
      type: typeBooking[returnRandomInteger(0, 5)],
      rooms: returnRandomInteger(1, 5),
      guests: returnRandomInteger(1, 5),
      checkin: checkinCheckoutTime[returnRandomInteger(0, 3)],
      checkout: checkinCheckoutTime[returnRandomInteger(0, 3)],
      features: getArrayElements(6, featuresList),
      description: 'Чисто, уютно, комфортно',
      photos: getArrayElements(3, photosList),
    },
    {
      lat: locationLat,
      lng: locationLng
    }
  ];
};

const adList = Array.from({length: 10}, createOffer);

console.log(adList);

