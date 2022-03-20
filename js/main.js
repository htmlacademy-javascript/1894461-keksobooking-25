import './ad.js';
import './similar-ads.js';
import './form-toggle.js';
import {switchToInactiveState, switchToActiveState} from './form-toggle.js';
import './form.js';

const adForm = document.querySelector('.ad-form');
switchToInactiveState(adForm);

const map = document.querySelector('.map__filters');
switchToInactiveState(map);

switchToActiveState(adForm);
switchToActiveState(map);
