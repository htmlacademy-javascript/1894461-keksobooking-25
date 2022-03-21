import {getOffers} from './ad.js';
import {BookingType, OFFERS_COUNT} from './constants.js';

const offerList = document.querySelector('#map-canvas');
const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const offers = getOffers(OFFERS_COUNT);

for (let i = 0; i < offers.length; i++) {
  const offerTemplateClone = offerTemplate.cloneNode(true);
  const offerElement = offers[i];

  offerTemplateClone.querySelector('.popup__title').textContent = offerElement.offer.title;
  if (offerElement.offer.title.length === 0) {
    offerTemplateClone.querySelector('.popup__title').classList.add('hidden');
  }

  offerTemplateClone.querySelector('.popup__text--address').textContent = offerElement.offer.address;
  if (offerElement.offer.address.length === 0) {
    offerTemplateClone.querySelector('.popup__text--address').classList.add('hidden');
  }

  offerTemplateClone.querySelector('.popup__text--price').textContent = `${offerElement.offer.price} ₽/ночь`;
  if (offerElement.offer.price.length === 0) {
    offerTemplateClone.querySelector('.popup__text--price').classList.add('hidden');
  }

  offerTemplateClone.querySelector('.popup__type').textContent = BookingType[offerElement.offer.type];
  if (offerElement.offer.type.length === 0) {
    offerTemplateClone.querySelector('.popup__type').classList.add('hidden');
  }

  offerTemplateClone.querySelector('.popup__text--capacity').textContent = `${offerElement.offer.rooms} комнаты для ${offerElement.offer.guests} гостей`;
  if (offerElement.offer.rooms.length === 0 || offerElement.offer.guests.length === 0) {
    offerTemplateClone.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  offerTemplateClone.querySelector('.popup__text--time').textContent = `Заезд после ${offerElement.offer.checkin}, выезд до ${offerElement.offer.checkout}`;
  if (offerElement.offer.rooms.length === 0 || offerElement.offer.guests.length === 0) {
    offerTemplateClone.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featuresContainer = offerTemplateClone.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (offerElement.offer.features.length === 0) {
    featuresContainer.classList.add('hidden');
  } else {
    Array.from(featuresList).forEach((featuresListItem) => {
      const isNecessary = offerElement.offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }

  offerTemplateClone.querySelector('.popup__description').textContent = offerElement.offer.description;
  if (offerElement.offer.description.length === 0) {
    offerTemplateClone.querySelector('.popup__description').classList.add('hidden');
  }

  const photosContainer = offerTemplateClone.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (offerElement.offer.photos.length === 0) {
    photosContainer.classList.add('.hidden');
  } else {
    for (let j = 0; j < offerElement.offer.photos.length; j++) {
      const photo = document.createElement('img');
      photo.  classList.add('popup__photo');
      photo.src = offerElement.offer.photos[j];
      photosContainer.appendChild(photo);
    }
  }

  offerTemplateClone.querySelector('.popup__avatar').src = offerElement.author.avatar;
  if (offerElement.author.avatar.length === 0) {
    offerTemplateClone.querySelector('.popup__avatar').classList.add('hidden');
  }

  offerList.appendChild(offerTemplateClone);
}
