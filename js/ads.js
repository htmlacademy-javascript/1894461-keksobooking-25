import {regularPinIcon, map} from './map.js';
import {createCustomPopup} from './balloon-content.js';

const renderAdsList = (ads) => {
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


export {renderAdsList};
