import {getOffers} from './ad.js';
import {BookingType, OFFER_COUNT} from './constants.js';

const similarListElement = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = getOffers(OFFER_COUNT);

for (let i = 0; i < similarOffers.length; i++) {
  const offerElement = similarOfferTemplate.cloneNode(true);
  const similarOffer = similarOffers[i];

  offerElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
  if (similarOffer.offer.title.length === 0) {
    offerElement.querySelector('.popup__title').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  if (similarOffer.offer.address.length === 0) {
    offerElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--price').textContent = `${similarOffer.offer.price} ₽/ночь`;
  if (similarOffer.offer.price.length === 0) {
    offerElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  offerElement.querySelector('.popup__type').textContent = BookingType[similarOffer.offer.type];
  if (similarOffer.offer.type.length === 0) {
    offerElement.querySelector('.popup__type').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--capacity').textContent = `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`;
  if (similarOffer.offer.rooms.length === 0 || similarOffer.offer.guests.length === 0) {
    offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
  if (similarOffer.offer.rooms.length === 0 || similarOffer.offer.guests.length === 0) {
    offerElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featuresContainer = offerElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (similarOffer.offer.features.length === 0) {
    featuresContainer.classList.add('hidden');
  } else {
    Array.from(featuresList).forEach((featuresListItem) => {
      const isNecessary = similarOffer.offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }

  offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;
  if (similarOffer.offer.description.length === 0) {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  }

  const photosContainer = offerElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (similarOffer.offer.photos.length === 0) {
    photosContainer.classList.add('.hidden');
  } else {
    for (let j = 0; j < similarOffer.offer.photos.length; j++) {
      const photo = document.createElement('img');
      photo.  classList.add('popup__photo');
      photo.src = similarOffer.offer.photos[i];
      photosContainer.appendChild(photo);
    }
  }

  offerElement.querySelector('.popup__avatar').src = similarOffer.author.avatar;
  if (similarOffer.author.avatar.length === 0) {
    offerElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  similarListElement.appendChild(offerElement);
}
