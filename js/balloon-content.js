import {BookingType} from './constants.js';

const OfferPhotoAttribute = {
  WIDTH: '45',
  HEIGHT: '40',
  ALT:'Фотография жилья'
};

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  if (point.offer.price) {
    popupElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  }
  if (point.offer.type) {
    popupElement.querySelector('.popup__type').textContent = BookingType[point.offer.type.toUpperCase()];
  }
  if (point.offer.rooms && point.offer.guests) {
    popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  }
  if (point.offer.checkin && point.offer.checkout) {
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  }
  if (point.offer.description) {
    popupElement.querySelector('.popup__description').textContent = point.offer.description;
  }

  for (const node of popupElement.children) {
    if (node.textContent.length === 0) {
      node.classList.add('hidden');
    }
  }

  const featuresContainer = popupElement.querySelector('.popup__features');
  const features = featuresContainer.querySelectorAll('.popup__feature');
  if (!(point.offer && point.offer.features)) {
    featuresContainer.classList.add('hidden');
  }

  if (point.offer && point.offer.features) {
    Array.from(features).forEach((featuresItem) => {
      const isNecessary = point.offer.features.some(
        (feature) => featuresItem.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        featuresItem.remove();
      }
    });
  }

  const photosContainer = popupElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (!point.offer.photos) {
    photosContainer.classList.add('hidden');
  }

  if (point.offer.photos) {
    point.offer.photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.  classList.add('popup__photo');
      photoElement.src = photo;
      photoElement.width = OfferPhotoAttribute.WIDTH;
      photoElement.height = OfferPhotoAttribute.HEIGHT;
      photoElement.alt = OfferPhotoAttribute.ALT;
      photosContainer.appendChild(photoElement);
    });
  }

  popupElement.querySelector('.popup__avatar').src = point.author.avatar;
  if (point.author.avatar.length !== 0) {
    popupElement.querySelector('.popup__avatar').classList.remove('hidden');
  }

  return popupElement;
};

export {createCustomPopup};
