import {MapHousingToMinPrice, MAX_PRICE } from './constants.js';

const MAX_ROOM_NUMBER = 100;
const NOT_FOR_GUESTS_CAPACITY = 0;

const adForm = document.querySelector('.ad-form');
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__item',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__item',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
}, false);

const locale = 'ru';

const mapErrorToMessage = {
  required: 'Обязательное поле',
  email: 'В этом поле требуется действующий адрес электронной почты',
  number: 'В этом поле необходимо указать число',
  integer: 'Это поле требует целочисленного значения',
  url: 'В этом поле необходимо указать действительный URL-адрес веб-сайта',
  tel: 'В этом поле необходимо указать действительный номер телефона',
  maxlength: `Длина этого поля должна быть < ${1}`,
  minlength: `Длина этого поля должна быть > ${1}`,
  min: `Минимальное значение для этого поля ${1}`,
  max: `Максимальное значение для этого поля ${1}`,
  pattern: 'Выберите соответствующий формат',
  equals: 'Два поля не совпадают'
};

Pristine.setLocale(locale);
Pristine.addMessages(locale, mapErrorToMessage);

const offerTitle = adForm.querySelector('#title');

const checkTitleLength = (title) => title.length >=30 && title.length <=100;


pristine.addValidator(offerTitle, checkTitleLength, 'Не меньше 30 символов и не больше 100', 2, true);

const offerPrice = adForm.querySelector('#price');

const checkPrice = (price) => (+price <= MAX_PRICE) && (+price >= +offerPrice.min);

const getPriceError = (price) => {
  if (+price > MAX_PRICE) {
    return `Максимальное значение ${MAX_PRICE}`;
  }

  if (+price < +offerPrice.min) {
    return `Минимальное значение ${offerPrice.min}`;
  }
};

pristine.addValidator(offerPrice, checkPrice, getPriceError, 2, true);

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const mapCapacityToError  = {
  1: ['для 1 гостя'],
  2: ['для 1 гостя' , 'для 2 гостей'],
  3: ['для 1 гостя' , 'для 2 гостей', 'для 3 гостей'],
  100: ['не для гостей']
};

const HundredRoomsNotForGuestsValue = {
  ROOMS: 100,
  GUESTS: 0
};

const validateRoomsAndCapacity = () => {
  if ((+capacity.value === NOT_FOR_GUESTS_CAPACITY && +roomNumber.value !== MAX_ROOM_NUMBER) || (+capacity.value !== NOT_FOR_GUESTS_CAPACITY && +roomNumber.value === MAX_ROOM_NUMBER))  {
    return false;
  }
  return capacity.value <= roomNumber.value;
};

const getRoomsAndCapacityError = () => {
  if (+roomNumber.value === HundredRoomsNotForGuestsValue.ROOMS) {
    return `Комнаты ${mapCapacityToError[roomNumber.value]}`;
  }

  return mapCapacityToError[roomNumber.value].join(' или ');
};

pristine.addValidator(roomNumber, validateRoomsAndCapacity, getRoomsAndCapacityError, 1, false);

const currentMinPrice = adForm.querySelector('[name="type"] option:checked').value;
offerPrice.min = MapHousingToMinPrice[currentMinPrice.toUpperCase()];

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
