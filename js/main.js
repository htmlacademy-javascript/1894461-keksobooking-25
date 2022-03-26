import './ad.js';
import './form.js';
import {switchToInactiveState, switchToActiveState} from './form.js';
import './map.js';

const adForm = document.querySelector('.ad-form');
switchToInactiveState(adForm);

const map = document.querySelector('.map__filters');
switchToInactiveState(map);

switchToActiveState(adForm);
switchToActiveState(map);
