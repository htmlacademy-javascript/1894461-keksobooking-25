const disableChild = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const childList = form.childNodes;

  childList.forEach((child) => {
    child.disabled = true;
  });
};

const enableChild = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const childList = form.childNodes;

  childList.forEach((child) => {
    child.disabled = false;
  });
};

const adForm = document.querySelector('.ad-form');
disableChild(adForm);

const map = document.querySelector('.map__filters');
disableChild(map);

enableChild(adForm);

enableChild(map);
