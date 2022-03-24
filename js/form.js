const MAX_PRICE = 100000;

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

const firstParameter = ['${', '1}'].join('');

const mapErrorToMessage = {
  required: 'Обязательное поле',
  email: 'В этом поле требуется действующий адрес электронной почты',
  number: 'В этом поле необходимо указать число',
  integer: 'Это поле требует целочисленного значения',
  url: 'В этом поле необходимо указать действительный URL-адрес веб-сайта',
  tel: 'В этом поле необходимо указать действительный номер телефона',
  maxlength: `Длина этого поля должна быть < ${firstParameter}`,
  minlength: `Длина этого поля должна быть > ${1}`,
  min: 'Минимальное значение для этого поля ${1}',
  max: 'Максимальное значение для этого поля ${1}',
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

const numberRoom = adForm.querySelector('#room_number');
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
  if ((+capacity.value === HundredRoomsNotForGuestsValue.GUESTS && +numberRoom.value !== HundredRoomsNotForGuestsValue.ROOMS) || (+capacity.value !== HundredRoomsNotForGuestsValue.GUESTS && +numberRoom.value === HundredRoomsNotForGuestsValue.ROOMS))  {
    return false;
  }
  return capacity.value <= numberRoom.value;
};

const getRoomsAndCapacityError = () => {
  if (numberRoom.value === '100') {
    return `Комнаты ${mapCapacityToError[numberRoom.value]}`;
  }

  return mapCapacityToError[numberRoom.value].join(' или ');
};

pristine.addValidator(numberRoom, validateRoomsAndCapacity, getRoomsAndCapacityError, 1, false);

const MapHousingToMinPrice  = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000
};

const currentMinPrice = adForm.querySelector('[name="type"] option:checked').value;
offerPrice.min = MapHousingToMinPrice[currentMinPrice.toUpperCase()];

const currentBookingType = adForm.querySelector('#type');

currentBookingType.addEventListener('change', (evt) => {

  offerPrice.placeholder = MapHousingToMinPrice[evt.target.value.toUpperCase()];
  offerPrice.min = MapHousingToMinPrice[evt.target.value.toUpperCase()];
});

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

export {switchToInactiveState, switchToActiveState};
