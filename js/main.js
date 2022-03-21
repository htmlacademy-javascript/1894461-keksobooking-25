import './ad.js';
import './similar-ads.js';
import './form.js';
import {switchToInactiveState, switchToActiveState} from './form.js';

const adForm = document.querySelector('.ad-form');
switchToInactiveState(adForm);

const map = document.querySelector('.map__filters');
switchToInactiveState(map);

switchToActiveState(adForm);
switchToActiveState(map);
