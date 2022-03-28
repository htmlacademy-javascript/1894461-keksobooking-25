import {getOffers} from './ad.js';
import {OFFERS_COUNT} from './constants.js';
import {switchToActiveState, adForm, mapFilter} from './form.js';
import {createCustomPopup} from './balloon-content.js';

const LATITUDE = 35.6762;
const LONGITUDE = 139.6503;

const map = L.map('map')
  .on('load', () => {
    switchToActiveState(adForm);
    switchToActiveState(mapFilter);
  })
  .setView({
    lat: LATITUDE,
    lng: LONGITUDE,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const mainPinIconSideLength = 52;
const regularPinIconSideLength = 40;

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [mainPinIconSideLength, mainPinIconSideLength],
  iconAnchor: [mainPinIconSideLength/2, mainPinIconSideLength],
});

const regularPinIcon =  L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [regularPinIconSideLength, regularPinIconSideLength],
  iconAnchor: [regularPinIconSideLength/2, regularPinIconSideLength],
});

const  mainMarker = L.marker(
  {
    lat: LATITUDE,
    lng: LONGITUDE,
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
