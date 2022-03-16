import {getOffers} from './ad.js';
import {BookingType, OFFERS_COUNT} from './constants.js';

const generateListElement = document.querySelector('#map-canvas');
const generateOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const Offers = getOffers(OFFERS_COUNT);

for (let i = 0; i < Offers.length; i++) {
  const offerElement = generateOfferTemplate.cloneNode(true);
  const generateOffer = Offers[i];

  offerElement.querySelector('.popup__title').textContent = generateOffer.offer.title;
  if (generateOffer.offer.title.length === 0) {
    offerElement.querySelector('.popup__title').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--address').textContent = generateOffer.offer.address;
  if (generateOffer.offer.address.length === 0) {
    offerElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--price').textContent = `${generateOffer.offer.price} ₽/ночь`;
  if (generateOffer.offer.price.length === 0) {
    offerElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  offerElement.querySelector('.popup__type').textContent = BookingType[generateOffer.offer.type];
  if (generateOffer.offer.type.length === 0) {
    offerElement.querySelector('.popup__type').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--capacity').textContent = `${generateOffer.offer.rooms} комнаты для ${generateOffer.offer.guests} гостей`;
  if (generateOffer.offer.rooms.length === 0 || generateOffer.offer.guests.length === 0) {
    offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${generateOffer.offer.checkin}, выезд до ${generateOffer.offer.checkout}`;
  if (generateOffer.offer.rooms.length === 0 || generateOffer.offer.guests.length === 0) {
    offerElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featuresContainer = offerElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (generateOffer.offer.features.length === 0) {
    featuresContainer.classList.add('hidden');
  } else {
    Array.from(featuresList).forEach((featuresListItem) => {
      const isNecessary = generateOffer.offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }

  offerElement.querySelector('.popup__description').textContent = generateOffer.offer.description;
  if (generateOffer.offer.description.length === 0) {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  }

  const photosContainer = offerElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (generateOffer.offer.photos.length === 0) {
    photosContainer.classList.add('.hidden');
  } else {
    for (let j = 0; j < generateOffer.offer.photos.length; j++) {
      const photo = document.createElement('img');
      photo.  classList.add('popup__photo');
      photo.src = generateOffer.offer.photos[j];
      photosContainer.appendChild(photo);
    }
  }

  offerElement.querySelector('.popup__avatar').src = generateOffer.author.avatar;
  if (generateOffer.author.avatar.length === 0) {
    offerElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  generateListElement.appendChild(offerElement);
}
