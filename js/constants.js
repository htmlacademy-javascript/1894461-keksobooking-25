const MAX_PRICE = 100000;

const BookingType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const MapHousingToMinPrice  = {
  PALACE: '10000',
  FLAT: '1000',
  HOUSE: '5000',
  BUNGALOW: '0',
  HOTEL: '3000'
};

export {BookingType, MapHousingToMinPrice, MAX_PRICE};
