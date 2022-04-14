
import { showModalWindow } from './validation.js';
import {switchToActiveState} from './form-activation.js';

const FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';
const REQUEST_METHOD = 'POST';
const RequestStatusClass = {
  SUCCESS: 'success',
  ERROR: 'error'
};
const RequestUrl = {
  POST: 'https://25.javascript.pages.academy/keksobooking',
  GET: 'https://25.javascript.pages.academy/keksobooking/data'
};

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');


const getAds = (onSuccess, onFail) => {
  fetch(RequestUrl.GET)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
      switchToActiveState(mapFilter);
      switchToActiveState(adForm);
    })
    .catch(() => onFail(FAILURE_MESSAGE));
};

const sendAd = (evt, onSuccess) => {
  const formData = new FormData (evt.target);
  fetch(
    RequestUrl.POST,
    {
      method: REQUEST_METHOD,
      body: formData
    },)
    .then((response) => {
      if (response.ok) {
        return showModalWindow(RequestStatusClass.SUCCESS);
      }
      return Promise.reject(response);
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      showModalWindow(RequestStatusClass.ERROR);
    });
};

export {getAds, sendAd};
