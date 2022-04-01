import {regularPinIcon, map} from './map.js';
import {createCustomPopup} from './balloon-content.js';
import { showAlert } from './util.js';

const getData = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
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
  })
  .catch(() => showAlert('Не удалось получить данные. Попробуйте ещё раз'));

export {getData};
