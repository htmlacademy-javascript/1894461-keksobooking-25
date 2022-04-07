import {BookingType} from './constants.js';

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  if (point.offer.title.length === 0) {
    popupElement.querySelector('.popup__title').classList.add('hidden');
  }

  popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  if (point.offer.address.length === 0) {
    popupElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  popupElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  if (point.offer.price.length === 0) {
    popupElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  popupElement.querySelector('.popup__type').textContent = BookingType[point.offer.type];
  if (point.offer.type.length === 0) {
    popupElement.querySelector('.popup__type').classList.add('hidden');
  }

  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  if (point.offer.rooms.length === 0 || point.offer.guests.length === 0) {
    popupElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  if (point.offer.rooms.length === 0 || point.offer.guests.length === 0) {
    popupElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featuresContainer = popupElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (!(point.offer && point.offer.features)) {
    featuresContainer.classList.add('hidden');
  }

  if (point.offer && point.offer.features) {
    Array.from(featuresList).forEach((featuresListItem) => {
      const isNecessary = point.offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }

  popupElement.querySelector('.popup__description').textContent = point.offer.description;
  if (!(point.offer && point.offer.description)) {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }

  const photosContainer = popupElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (!(point.offer && point.offer.photos)) {
    photosContainer.classList.add('.hidden');
  }

  if (point.offer && point.offer.photos) {
    for (let j = 0; j < point.offer.photos.length; j++) {
      const photo = document.createElement('img');
      photo.  classList.add('popup__photo');
      photo.src = point.offer.photos[j];
      photo.width = '45';
      photo.height = '40';
      photo.alt = 'Фотография жилья';
      photosContainer.appendChild(photo);
    }
  }

  popupElement.querySelector('.popup__avatar').src = point.author.avatar;
  if (point.author.avatar.length === 0) {
    popupElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  return popupElement;
};

export {createCustomPopup};
