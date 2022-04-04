import {switchToActiveState} from './form.js';

const InitialCoordinates = {
  LATITUDE: 35.68380,
  LONGITUDE: 139.75340
};

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');

const map = L.map('map')
  .on('load', () => {
    switchToActiveState(adForm);
    switchToActiveState(mapFilter);
  })
  .setView({
    lat: InitialCoordinates.LATITUDE,
    lng: InitialCoordinates.LONGITUDE,
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
    lat: InitialCoordinates.LATITUDE,
    lng: InitialCoordinates.LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

const startLatLng = mainMarker.getLatLng();

const setMarkerInitialPosition = () => {
  mainMarker.setLatLng(
    {
      lat: InitialCoordinates.LATITUDE,
      lng: InitialCoordinates.LONGITUDE,
    });
  addressField.value = `lat: ${startLatLng.lat.toFixed(5)}, lng: ${startLatLng.lng.toFixed(5)}`;
};

setMarkerInitialPosition();

mainMarker.on('moveend', (evt) => {
  const currentLatLng = evt.target.getLatLng();
  addressField.value = `lat: ${currentLatLng.lat.toFixed(5)}, lng: ${currentLatLng.lng.toFixed(5)}`;
});

export {regularPinIcon, map, setMarkerInitialPosition};
