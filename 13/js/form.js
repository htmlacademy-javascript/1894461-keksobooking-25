import {MapHousingToMinPrice, MAX_PRICE } from './constants.js';
import {setMarkerOnStartPosition} from './map.js';

const adForm = document.querySelector('.ad-form');
const offerPrice = adForm.querySelector('#price');
const currentMinPrice = adForm.querySelector('[name="type"] option:checked').value;
const currentBookingType = adForm.querySelector('#type');
const adFormReset = adForm.querySelector('.ad-form__reset');
const mapFilter = document.querySelector('.map__filters');

const switchToInactiveState = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const childrenList = form.childNodes;

  for (let i = 0; i < childrenList.length; i++) {
    childrenList[i].disabled = true;
  }
};

const switchToActiveState = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const childrenList = form.childNodes;

  for (let i = 0; i < childrenList.length; i++) {
    childrenList[i].disabled = false;
  }
};

offerPrice.min = MapHousingToMinPrice[currentMinPrice.toUpperCase()];

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: +offerPrice.min,
    max: MAX_PRICE,
  },
  start: +offerPrice.min,
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

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

const resetSliderElement = () => {
  sliderElement.noUiSlider.reset();
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

valueElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});

const resetForm = () => {
  adForm.reset();
  setMarkerOnStartPosition();
  resetSliderElement();
};

adFormReset.addEventListener('click', () => resetForm());

switchToInactiveState(adForm);


switchToInactiveState(mapFilter);

export {switchToActiveState, resetForm, resetSliderElement};
