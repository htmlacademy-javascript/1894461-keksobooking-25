import {regularPinIcon, map} from './map.js';
import {createCustomPopup} from './balloon-content.js';

const renderAds = (ads) => {
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
    regularMarker.addTo(map);
    regularMarker.bindPopup(createCustomPopup(ad));
  });
};


export {renderAds};
