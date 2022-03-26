import {getOffers} from './ad.js';
import {BookingType, OFFERS_COUNT} from './constants.js';
import {switchToActiveState, adForm, mapFilter} from './form.js';

const map = L.map('map')
  .on('load', () => {
    switchToActiveState(adForm);
    switchToActiveState(mapFilter);
  })
  .setView({
    lat: 35.6762,
    lng: 139.6503,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const regularPinIcon =  L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const  mainMarker = L.marker(
  {
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

const startLatLng = mainMarker.getLatLng();
const addressField = document.querySelector('#address');
addressField.value = `lat: ${startLatLng.lat.toFixed(5)}, lng: ${startLatLng.lng.toFixed(5)}`;

mainMarker.on('moveend', (evt) => {
  const currentLatLng = evt.target.getLatLng();
  addressField.value = `lat: ${currentLatLng.lat.toFixed(5)}, lng: ${currentLatLng.lng.toFixed(5)}`;
});

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
  if (point.offer.features.length === 0) {
    featuresContainer.classList.add('hidden');
  } else {
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
  if (point.offer.description.length === 0) {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }

  const photosContainer = popupElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (point.offer.photos.length === 0) {
    photosContainer.classList.add('.hidden');
  } else {
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

const points = getOffers(OFFERS_COUNT);

points.forEach((point) => {
  const lat = point.location.lat;
  const lng = point.location.lng;
  const regularMarker = L.marker(
    {
      lat,
      lng
    },
    {
      icon: regularPinIcon
    }
  );
  regularMarker.addTo(map);
  regularMarker.bindPopup(createCustomPopup(point));
});
