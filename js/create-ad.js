import {BOOKING_TYPES, CHECKIN_TIMES, FACILITIES, PHOTOS, prices} from './initial-data.js';
import {getRandomInteger, getRandomFloat, getAuthorAvatar, getListElements} from './util.js';

const getOffer = () => {
  const locationLat = getRandomFloat (35.65000, 35.70000, 5);
  const locationLng = getRandomFloat (139.70000, 139.80000, 5);

  return [
    {
      avatar: getAuthorAvatar(String(getRandomInteger(1, 11)))
    },
    {
      title: 'Бронируйте у нас, это выгодно',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInteger (prices.minPrice, prices.maxPrice),
      type: BOOKING_TYPES[getRandomInteger(0, 5)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: CHECKIN_TIMES[getRandomInteger(0, 3)],
      checkout: CHECKIN_TIMES[getRandomInteger(0, 3)],
      features: getListElements(6, FACILITIES),
      description: 'Чисто, уютно, комфортно',
      photos: getListElements(3, PHOTOS),
    },
    {
      lat: locationLat,
      lng: locationLng
    }
  ];
};


const getOffers = (amountOffers) => {
  const offers = [];
  for (let i = 0; i < amountOffers; i++) {
    offers.push(getOffer());
  }

  return offers;
};

export {getOffers};
