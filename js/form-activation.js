const switchToActiveState = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const children = form.childNodes;

  for (let i = 0; i < children.length; i++) {
    children[i].disabled = false;
  }
};

export {switchToActiveState};
