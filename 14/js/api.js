
import { showModalWindow } from './validation.js';

const FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';
const REQUEST_METHOD = 'POST';
const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';
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
      showModalWindow(SUCCESS_CLASS);
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      showModalWindow(ERROR_CLASS);
    });
};

export {getAds, sendAd};
