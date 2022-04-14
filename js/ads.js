import { regularPinIcon, addMarkerToMap, removeMarkersFromMap } from './map.js';
import { getAds } from './api.js';
import { showAlert, debounce } from './util.js';

const ADS_COUNT = 10;
const DEFAULT_VALUE = 'any';
const RERENDER_DELAY = 500;
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

const renderMarkers = (ads) => {
  ads.forEach((ad) => {
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
    addMarkerToMap(regularMarker, ad);
  });
};

const getCheckedCheckboxes = () => {
  const checkedCheckboxes = document.querySelectorAll('[name="features"]:checked');
  const markedFeatures = [];
  checkedCheckboxes.forEach((checkbox) => {
    markedFeatures.push(checkbox.value);
  });

  return markedFeatures;
};


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

  return housingGuest.value === DEFAULT_VALUE;
};

const checkFeature = (ad) => {
  if (ad.offer.features) {
    const isMatchedFeature = getCheckedCheckboxes().every((markedFeature) => ad.offer.features.includes(markedFeature));
    return isMatchedFeature;
  }
  if (getCheckedCheckboxes().length === 0) {
    return true;
  }

  return false;
};

const isAdMatchFilter = (ad) => checkType(ad) && checkPrice(ad) && checkRoom(ad) && checkGuest(ad) && checkFeature(ad);
const renderAds = (ads) => {
  removeMarkersFromMap();
  const filteredAds = ads
    .filter(isAdMatchFilter)
    .slice(0, ADS_COUNT);
  renderMarkers(filteredAds);
};

const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', () => {
    cb();
  });
};

const showRenderAds = () => {
  getAds(
    (ads) => {
      renderAds(ads);
      setFilterChange(debounce(
        () => renderAds(ads),
        RERENDER_DELAY,
      ));
    },
    showAlert
  );
};

export {showRenderAds};
