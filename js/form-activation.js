const adForm = document.querySelector('.ad-form');
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

switchToInactiveState(adForm);


switchToInactiveState(mapFilter);

export {switchToInactiveState, switchToActiveState};
