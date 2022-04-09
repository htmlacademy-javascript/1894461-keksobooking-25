const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const roomPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const roomPhotoWrapper = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});
roomPhotoChooser.addEventListener('change', () => {
  if (roomPhotoWrapper.querySelector('img')) {
    roomPhotoWrapper.innerHTML = '';
  }

  const roomPhoto = document.createElement('img');
  roomPhotoWrapper.appendChild(roomPhoto);
  roomPhoto.src = '';
  roomPhoto.style.width = '70px';
  roomPhoto.style.height = '70px';
  roomPhoto.accept = 'image/gif, image/jpg, image/jpeg, image/png';
  const file = roomPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    roomPhoto.src = URL.createObjectURL(file);
  }
});
