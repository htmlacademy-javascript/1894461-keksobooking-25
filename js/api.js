
import { showModalWindow } from './validation.js';

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


const getAds = (onSuccess, onFail) => {
  fetch(RequestUrl.GET)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
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
    .then(() => {
      showModalWindow(RequestStatusClass.SUCCESS);
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      showModalWindow(RequestStatusClass.ERROR);
    });
};

export {getAds, sendAd};
