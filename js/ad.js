import {BOOKING_TYPES, CHECKIN_TIMES, FACILITIES, PHOTOS, Prices} from './constants.js';
import {getRandomInteger, getRandomFloat, getAuthorAvatar, getListElements} from './util.js';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const getOffer = () => {
  const locationLat = getRandomFloat (35.65000, 35.70000, 5);
  const locationLng = getRandomFloat (139.70000, 139.80000, 5);

  return {
    author:  {
      avatar: getAuthorAvatar(String(getRandomInteger(1, 11)))
    },
    offer: {
      title: faker.company.companyName(),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInteger (Prices.MIN_PRICE, Prices.MAX_PRICE),
      type: BOOKING_TYPES[getRandomInteger(0, 5)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: CHECKIN_TIMES[getRandomInteger(0, 3)],
      checkout: CHECKIN_TIMES[getRandomInteger(0, 3)],
      features: getListElements(6, FACILITIES),
      description: faker.commerce.productDescription(),
      photos: getListElements(3, PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng
    }
  };
};


const getOffers = (amountOffers) => {
  const offers = [];
  for (let i = 0; i < amountOffers; i++) {
    offers.push(getOffer());
  }

  return offers;
};

export {getOffers};
