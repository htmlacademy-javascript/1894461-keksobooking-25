import {setMarkerInitialPosition} from './map.js';
import {MapHousingToMinPrice, MAX_PRICE } from './constants.js';
import './validation.js';

const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const offerPrice = adForm.querySelector('#price');
const currentMinPrice = adForm.querySelector('[name="type"] option:checked').value;
const currentBookingType = adForm.querySelector('#type');
const adFormReset = adForm.querySelector('.ad-form__reset');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const roomPhotoWrapper = document.querySelector('.ad-form__photo');
const sliderElement = document.querySelector('.ad-form__slider');
offerPrice.min = +MapHousingToMinPrice[currentMinPrice.toUpperCase()];

noUiSlider.create(sliderElement, {
  range: {
    min: +MapHousingToMinPrice[currentMinPrice.toUpperCase()],
    max: MAX_PRICE,
  },
  start: +MapHousingToMinPrice[currentMinPrice.toUpperCase()],
  step: 1,
  connect: 'lower',
  format:{
    to: (value) => {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(0);
    },
    from: (value) => parseFloat(value)
  }
});

const resetSliderElement = () => {
  sliderElement.noUiSlider.reset();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: +MapHousingToMinPrice[currentMinPrice.toUpperCase()],
      max: MAX_PRICE,
    },
    start: +MapHousingToMinPrice[currentMinPrice.toUpperCase()]
  });
};

currentBookingType.addEventListener('change', (evt) => {
  offerPrice.placeholder = MapHousingToMinPrice[evt.target.value.toUpperCase()];
  offerPrice.min = MapHousingToMinPrice[evt.target.value.toUpperCase()];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: +offerPrice.min,
      max: MAX_PRICE
    },
    start: +offerPrice.min
  });
});

sliderElement.noUiSlider.on('slide', () => {
  offerPrice.value = sliderElement.noUiSlider.get();
});

offerPrice.addEventListener('input', () => {
  sliderElement.noUiSlider.set(offerPrice.value);
});

const resetForm = () => {
  adForm.reset();
  setMarkerInitialPosition();
  offerPrice.placeholder = MapHousingToMinPrice.FLAT;
  offerPrice.min = MapHousingToMinPrice.FLAT;
  previewAvatar.src = DEFAULT_AVATAR_URL;
  roomPhotoWrapper.innerHTML = '';
  resetSliderElement();
};

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {resetForm, resetSliderElement};
