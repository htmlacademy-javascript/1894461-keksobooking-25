const FILE_TYPES = ['avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp', 'tiff', 'tif', 'ico', 'xbm', 'jxl', 'svgz', 'bmp'];

const ROOM_PHOTO_WIDTH = '70px';
const ROOM_PHOTO_HEIGHT = '70px';

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
  roomPhoto.style.width = ROOM_PHOTO_WIDTH;
  roomPhoto.style.height = ROOM_PHOTO_HEIGHT;
  roomPhotoWrapper.appendChild(roomPhoto);
  const file = roomPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (roomPhotoWrapper.querySelectorAll('img').length > 1) {
      const photoList = roomPhotoWrapper.querySelectorAll('img');
      roomPhotoWrapper.removeChild(photoList[0]);
    }
    roomPhoto.src = URL.createObjectURL(file);
  }
});
