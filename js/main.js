import './form-activation.js';
import { resetForm } from './form.js';
import { setFormSubmitListener } from './validation.js';
import { renderAds, setFilterChange } from './ads.js';
import { getAds } from './api.js';
import { showAlert, debounce } from './util.js';
import './setting-photo.js';

const RERENDER_DELAY = 500;

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

setFormSubmitListener(resetForm);

