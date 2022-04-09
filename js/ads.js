import {regularPinIcon, markerGroup} from './map.js';
import {createCustomPopup} from './balloon-content.js';

const AD_COUNT = 10;
const DEFAULT_VALUE = 'any';
const PriceValue = {
  LOW: 10000,
  MIDDLE: 50000,
  HIGH: 100000
};
const PriceCategory = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};

const mapFilter = document.querySelector('.map__filters');
const housingType = document.querySelector('[name="housing-type"]');
const housingPrice = document.querySelector('[name="housing-price"]');
const housingRoom = document.querySelector('[name="housing-rooms"]');
const housingGuest = document.querySelector('[name="housing-guests"]');

const checkType = (ad) => ad.offer.type === housingType.value || DEFAULT_VALUE === housingType.value;
const checkRoom = (ad) => +ad.offer.rooms === +housingRoom.value || DEFAULT_VALUE === housingRoom.value;
const checkPrice = (ad) => {
  if (housingPrice.value  === PriceCategory.LOW) {
    return ad.offer.price <= PriceValue[housingPrice.value.toUpperCase()];
  }
  if (housingPrice.value  === PriceCategory.MIDDLE) {
    return ad.offer.price <= PriceValue[housingPrice.value.toUpperCase()] && ad.offer.price > PriceValue.LOW;
  }
  if (housingPrice.value  === PriceCategory.HIGH) {
    return ad.offer.price <= PriceValue[housingPrice.value.toUpperCase()] && ad.offer.price > PriceValue.MIDDLE;
  }
  return true;
};

const checkGuest = (ad) => {
  if (+housingGuest.value  === ad.offer.guests) {
    return true;
  }
  if (housingGuest.value === DEFAULT_VALUE) {
    return true;
  }
};

const checkFeature = (ad, checkedCheckboxes) => {
  const markedFeatures = [];
  checkedCheckboxes.forEach((checkbox) => {
    markedFeatures.push(checkbox.value);
  });

  if (ad.offer.features) {
    const matchFeature = markedFeatures.every((markedFeature) => ad.offer.features.includes(markedFeature));
    return matchFeature;
  }
};

const getFilteredAds = (ad) => {
  const checkedCheckboxes = document.querySelectorAll('[name="features"]:checked');
  return (checkType(ad) && checkPrice(ad) && checkRoom(ad) && checkGuest(ad) && checkFeature(ad, checkedCheckboxes));
};
const renderAds = (ads) => {
  markerGroup.clearLayers();
  ads
    .slice()
    .filter(getFilteredAds)
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
