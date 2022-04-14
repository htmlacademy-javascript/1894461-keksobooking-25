import { createCustomPopup } from './balloon-content.js';
import { showRenderAds } from './ads.js';

const MAP_SCALE = '12';
const IconUrl = {
  MAIN: './img/main-pin.svg',
  REGULAR: './img/pin.svg'
};
const InitialCoordinate = {
  LATITUDE: 35.68380,
  LONGITUDE: 139.75340
};

const addressField = document.querySelector('#address');
const mainPinIconSideLength = 52;
const regularPinIconSideLength = 40;

const map = L.map('map')
  .on('load', () => {
    showRenderAds();
  })
  .setView({
    lat: InitialCoordinate.LATITUDE,
    lng: InitialCoordinate.LONGITUDE,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: IconUrl.MAIN,
  iconSize: [mainPinIconSideLength, mainPinIconSideLength],
  iconAnchor: [mainPinIconSideLength/2, mainPinIconSideLength],
});

const regularPinIcon =  L.icon({
  iconUrl: IconUrl.REGULAR,
  iconSize: [regularPinIconSideLength, regularPinIconSideLength],
  iconAnchor: [regularPinIconSideLength/2, regularPinIconSideLength],
});

const  mainMarker = L.marker(
  {
    lat: InitialCoordinate.LATITUDE,
    lng: InitialCoordinate.LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);
const startLatLng = mainMarker.getLatLng();

const addMarkerToMap = (marker, ad) => {
  marker.addTo(markerGroup);
  marker.bindPopup(createCustomPopup(ad));
};

const removeMarkersFromMap = () => {
  markerGroup.clearLayers();
};

const setMarkerInitialPosition = () => {
  mainMarker.setLatLng(
    {
      lat: InitialCoordinate.LATITUDE,
      lng: InitialCoordinate.LONGITUDE,
    });
  addressField.value = `${startLatLng.lat.toFixed(5)}, ${startLatLng.lng.toFixed(5)}`;
};

setMarkerInitialPosition();

mainMarker.on('move', (evt) => {
  const currentLatLng = evt.target.getLatLng();
  addressField.value = `${currentLatLng.lat.toFixed(5)}, ${currentLatLng.lng.toFixed(5)}`;
});

export {regularPinIcon, setMarkerInitialPosition, addMarkerToMap, removeMarkersFromMap};
