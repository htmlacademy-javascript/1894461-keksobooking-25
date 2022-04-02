
import { sendingRequestModalClass, disableSubmitButton, EnableSubmitButton } from './validation.js';

const REQUEST_METHOD = 'POST';
const REQUEST_URL = 'https://25.javascript.pages.academy/keksobooking';

const getAds = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => onFail('Не удалось получить данные. Попробуйте ещё раз'));
};

const sendAd = (evt, onSuccess) => {
  const formData = new FormData (evt.target);
  disableSubmitButton();
  fetch(
    REQUEST_URL,
    {
      method: REQUEST_METHOD,
      body: formData
    },)
    .then(() => {
      sendingRequestModalClass('success');
    })
    .then(() => {
      EnableSubmitButton();
      onSuccess();
    })
    .catch(() => {
      sendingRequestModalClass('error');
      EnableSubmitButton();
    });
};

export {getAds, sendAd};
