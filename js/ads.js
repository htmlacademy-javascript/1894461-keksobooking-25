import {regularPinIcon, markerGroup} from './map.js';
import {createCustomPopup} from './balloon-content.js';

const AD_COUNT = 10;
const DEFAULT_VALUE = 'any';
const PriceValue = {
  LOW: 10000,
  MIDDLE: 50000,
  HIGH: 100000
};

const mapFilter = document.querySelector('.map__filters');
const housingType = document.querySelector('[name="housing-type"]');
const housingPrice = document.querySelector('[name="housing-price"]');
const housingRoom = document.querySelector('[name="housing-rooms"]');
const housingGuest = document.querySelector('[name="housing-guests"]');

const filterByType = (ad) => ad.offer.type === housingType.value || DEFAULT_VALUE === housingType.value;
const filterByRoom = (ad) => +ad.offer.rooms === +housingRoom.value || DEFAULT_VALUE === housingRoom.value;
const filterByPrice = (ad) => {
  if (housingPrice.value  === 'low') {
    return ad.offer.price <= PriceValue[housingPrice.value.toUpperCase()];
  }
  if (housingPrice.value  === 'middle') {
    return ad.offer.price <= PriceValue[housingPrice.value.toUpperCase()] && ad.offer.price > PriceValue.LOW;
  }
  if (housingPrice.value  === 'high') {
    return ad.offer.price <= PriceValue[housingPrice.value.toUpperCase()] && ad.offer.price > PriceValue.MIDDLE;
  }
  return true;
};

const filterByGuest = (ad) => {
  if (+housingGuest.value  === ad.offer.guests) {
    return true;
  }
  if (housingGuest.value === DEFAULT_VALUE) {
    return true;
  }
};

const filterByFeature = (ad) => {
  const markedFeatures = [];
  const checkedCheckbox = document.querySelectorAll('[name="features"]:checked');
  checkedCheckbox.forEach((checkbox) => {
    markedFeatures.push(checkbox.value);
  });

  if (ad.offer.features) {
    let count = 0;
    for (let i = 0; i < markedFeatures.length; i++){
      if(ad.offer.features.indexOf(markedFeatures[i]) !== -1) {
        count++;
      }
    }
    return count === markedFeatures.length;
  }
};

const getFilteredAds = (ads) => ads.filter(filterByType).filter(filterByPrice).filter(filterByRoom).filter(filterByGuest).filter(filterByFeature);

const renderAds = (ads) => {
  markerGroup.clearLayers();
  const copyOfReceivedAds = ads.slice();
  const filteredAds = getFilteredAds(copyOfReceivedAds);
  filteredAds
    .slice()
    .slice(0, AD_COUNT)
    .forEach((ad) => {
      const lat = ad.location.lat;
      const lng = ad.location.lng;
      const regularMarker = L.marker(
        {
          lat,
          lng
        },
        {
          icon: regularPinIcon
        }
      );
      regularMarker.addTo(markerGroup);
      regularMarker.bindPopup(createCustomPopup(ad));
    });
};

const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', () => {
    cb();
  });
};

export {renderAds, setFilterChange};
