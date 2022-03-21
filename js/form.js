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

const adOffer = document.querySelector('.ad-form');
const pristine = new Pristine(adOffer, {
  classTo: 'ad-form__item',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__item',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
}, false);


const offerTitle = adOffer.querySelector('#title');

const checkTitleLength = (title) => title.length >=30 && title.length <=100;


pristine.addValidator(offerTitle, checkTitleLength, 'Не меньше 30 символов и не больше 100', 2, true);

const offerPrice = adOffer.querySelector('#price');
const MAX_PRICE = 100000;

const checkPrice = (price) => (isFinite(price) && (price <= MAX_PRICE));

pristine.addValidator(offerPrice, checkPrice, `Не более ${MAX_PRICE} руб.`, 2, true);

const numberOfRooms = adOffer.querySelector('#room_number');
const numberOfSeats = adOffer.querySelector('#capacity');
const capacityOptions = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 1 гостя' , 'для 2 гостей'],
  '3 комнаты': ['для 1 гостя' , 'для 2 гостей', 'для 3 гостей'],
  '100 комнат': ['не для гостей']
};

const validateRoomsAndCapacity = () => capacityOptions[numberOfRooms.value].includes(numberOfSeats.value);

const getRoomsAndCapacityError = () => {
  if (numberOfRooms.value === '100 комнат') {
    return `Комнаты ${capacityOptions[numberOfRooms.value]}`;
  }

  return `Максимум ${capacityOptions[numberOfRooms.value][capacityOptions[numberOfRooms.value].length - 1]}`;
};

pristine.addValidator(numberOfRooms, validateRoomsAndCapacity, getRoomsAndCapacityError, 1, false);


adOffer.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {switchToInactiveState, switchToActiveState};
