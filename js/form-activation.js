const switchToActiveState = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const children = form.childNodes;

  children.forEach((child) => {
    child.disabled = false;
  });
};

export {switchToActiveState};
