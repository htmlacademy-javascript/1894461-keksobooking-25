import './map.js';
import { resetForm } from './form.js';
import { setFormSubmitListener } from './validation.js';
import { renderAdsList } from './ads.js';
import { getAds } from './api.js';
import { showAlert } from './util.js';

getAds(
  (ads) => {
    renderAdsList(ads);
  },
  showAlert
);

setFormSubmitListener(resetForm);
