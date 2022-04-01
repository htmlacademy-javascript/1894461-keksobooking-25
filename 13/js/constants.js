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

const MapHousingToMinPrice  = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000
};

export {BOOKING_TYPES, CHECKIN_TIMES, FACILITIES, BookingType, MapHousingToMinPrice, MAX_PRICE};
