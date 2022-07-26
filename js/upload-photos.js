import { UPLOAIDING_PHOTOS_FILE_TYPES } from './data.js';

const avatarUploadElement = document.querySelector('.ad-form-header__upload input[type = file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const propertyPhotoUploadElement = document.querySelector('.ad-form__upload input[type = file]');
const propertyPhotoPreviewElement = document.querySelector('.ad-form__photo');

function uploadAvatarPhoto() {
  avatarUploadElement.addEventListener('change', () => {

    const file = avatarUploadElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = UPLOAIDING_PHOTOS_FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreviewElement.src = URL.createObjectURL(file);
    }
  });
}

function uploadPropertyPhoto() {
  propertyPhotoUploadElement.addEventListener('change', () => {

    const file = propertyPhotoUploadElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = UPLOAIDING_PHOTOS_FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const newPhotoElement = document.createElement('img');

      newPhotoElement.style.width = '70px';
      newPhotoElement.style.height = '74px';
      newPhotoElement.src = URL.createObjectURL(file);
      propertyPhotoPreviewElement.appendChild(newPhotoElement);
    }
  });
}

export { uploadPropertyPhoto, uploadAvatarPhoto };
