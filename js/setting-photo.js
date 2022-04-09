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
  const roomPhoto = document.createElement('img');
  roomPhotoWrapper.appendChild(roomPhoto);
  const file = roomPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (roomPhotoWrapper.querySelectorAll('img').length > 1) {
      const photoList = roomPhotoWrapper.querySelectorAll('img');
      roomPhotoWrapper.removeChild(photoList[0]);
    }
    roomPhoto.style.width = '70px';
    roomPhoto.style.height = '70px';
    roomPhoto.accept = 'image/gif, image/jpg, image/jpeg, image/png';
    roomPhoto.src = URL.createObjectURL(file);
  }
});
