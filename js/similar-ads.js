import {getOffers} from './ad.js';
import {bookingTypes} from './constants.js';

const isData = (data, className, offer) => {
  if (data === '' || data === []) {
    offer.querySelector(className).classList.add('hidden');
  } else {
    offer.querySelector(className).textContent = data;
  }
}

const isPrice = (price, className, offer) => {
  if (price === '') {
    offer.querySelector(className).classList.add('hidden');
  } else {
    offer.querySelector(className).textContent = price + ' ₽/ночь';
  }
};

const isType = (type, className, offer) => {
  if (type === []) {
    offer.querySelector(className).classList.add('hidden');
  } else {
    offer.querySelector(className).textContent = bookingTypes[type];
  }
};

const isAvatars = (avatar, className, offer) => {
  if (avatar === []) {
    offer.querySelector(className).classList.add('hidden');
  } else {
    offer.querySelector(className).src = avatar;
  }
};

const isCapacity = (rooms, guests, className, offer) => {
  if (rooms === '' || guests === '') {
    offer.querySelector(className).classList.add('hidden');
  } else {
    offer.querySelector(className).textContent = rooms + ' комнаты для ' + guests + ' гостей';
  }
};

const isTime = (checkin, checkout, className, offer) => {
  if (checkin === '' || checkout === '') {
    offer.querySelector(className).classList.add('hidden');
  } else {
    offer.querySelector(className).textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
  }
};

const isFeatures = (features, featuresContainer, featuresList) => {
  if (features = []) {
    featuresContainer.classList.add('hidden');
  } else {
    Array.from(featuresList).forEach((featuresListItem) => {
      const isNecessary = features.some(
        (feature) => featuresListItem.classList.contains('popup__feature--' + feature)
      );

      if (!isNecessary) {
        featuresListItem.remove();
      };
    });
  }

};

const isPhotos = (photos, photosContainer) =>  {
  if (photos === []) {
    photosContainer.classList.add('.hidden');
  } else {
    for (let i = 0; i < photos.length; i++) {
      const photo = document.createElement('img');
      photo.  classList.add('popup__photo');
      photo.src = photos[i];
      photosContainer.appendChild(photo);
    }
  };
};

const similarListElement = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = getOffers(5);

for (let i = 0; i < similarOffers.length; i++) {
  const offerElement = similarOfferTemplate.cloneNode(true);
  const similarOffer = similarOffers[i];
  isData(similarOffer.offer.title, '.popup__title', offerElement);
  isData(similarOffer.offer.address, '.popup__text--address', offerElement);
  isPrice(similarOffer.offer.price, '.popup__text--price', offerElement);
  isType(similarOffer.offer.type, '.popup__type', offerElement);
  isCapacity(similarOffer.offer.rooms, similarOffer.offer.guests, '.popup__text--capacity', offerElement);
  isTime(similarOffer.offer.checkin, similarOffer.offer.checkout, '.popup__text--time', offerElement);

  const featuresContainer = offerElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  isFeatures(similarOffer.offer.features, featuresContainer, featuresList);



  isData(similarOffer.offer.description, '.popup__description', offerElement);

  const photosContainer = offerElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';

  isPhotos(similarOffer.offer.photos, photosContainer);

  isAvatars(similarOffer.author.avatar, '.popup__avatar', offerElement);

  similarListElement.appendChild(offerElement);
}

