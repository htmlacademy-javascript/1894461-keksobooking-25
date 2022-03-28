
const MAX_PRICE = 100000;

const BOOKING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const BookingType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FACILITIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MapHousingToMinPrice  = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000
};

const Price = {
  MIN: 1500,
  MAX: 4000
};

const OFFERS_COUNT = 20;

export {BOOKING_TYPES, CHECKIN_TIMES, FACILITIES, PHOTOS, Price, BookingType, OFFERS_COUNT, MapHousingToMinPrice, MAX_PRICE};
