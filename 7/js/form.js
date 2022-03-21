const adOffer = document.querySelector('.ad-form');
const pristine = new Pristine(adOffer, {
  classTo: 'ad-form__item',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__item',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
}, false);


const titleOffer = adOffer.querySelector('#title');

const checkLengthTitle = (title) => ((title.length >=30) && (title.length <=100));


pristine.addValidator(titleOffer, checkLengthTitle, 'Не меньше 30 символов и не больше 100', 2, true);

const priceOffer = adOffer.querySelector('#price');
const maxPrice = 100000;

const checkPrice = (price) => (isFinite(price) && (price <= maxPrice));

pristine.addValidator(priceOffer, checkPrice, `Не более ${maxPrice} руб.`, 2, true);

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
