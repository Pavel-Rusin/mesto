import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
    validateSettings
} from './FormValidator.js';

// открываем попап редактирования профиля
const editButton = document.querySelector('.profile__button_edit'); 
const popupProfile = document.querySelector('.popup_type_profile');
const editFormSubmitButton = popupProfile.querySelector('.popup__button_type_submit'); 
const fullname = document.querySelector('.profile__fullname'); 
const subtitle = document.querySelector('.profile__subtitle'); 
const fullnameInput = document.querySelector('.popup__input_fullname'); 
const subtitleInput = document.querySelector('.popup__input_subtitle'); 
const exitButton = document.querySelector('.popup__profile_close');
// const profileForm = document.querySelector('form[name="shape"]');
// const editButtonSubmit = document.querySelector('.popup__submit_profile');

//Открываем фото попап
const photoPopup = document.querySelector('.popup_type_photo')
const photoImage = document.querySelector('.popup__image');
const photoDescription = document.querySelector('.popup__description');
const exitPhotoButton = document.querySelector('.popup__photo_close'); 

//добавляем попап добавления карточки
const elementList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__button_add');
const submitButtonAddCard = popupImage.querySelector('.popup__button_type_submit');
const nameInput = document.querySelector('.popup__input_name'); 
const imageInput = document.querySelector('.popup__input_image');
const exitAddButton = document.querySelector('.popup__image_close'); 
// const addImageForm = document.querySelector('form[name="image"]');

//инициализация
const profileValidation = new FormValidator(validateSettings, 'form[name="shape"]');
const addCardValidation = new FormValidator(validateSettings, 'form[name="image"]');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// const cardContainer = document.querySelector('.elements__list');

function addInitialCards() {
    initialCards.forEach((item) => {
      const card = new Card(item.name, item.link, '#element');
      const cardElement = card.createCard();
      elementList.prepend(cardElement);
    });
}

//открытие и закрытие попапов
function popupOpen (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', exitEscKey);
}

function popupClose (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', exitEscKey);
}

function exitEscKey(evt) {
    const popupActive = document.querySelector('.popup_opened');
    if (evt.code === 'Escape' && popupActive) {
        popupClose(popupActive);
    }
}

function overlayPopupClose(evt) {
    const popupActive = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')) {
        popupClose(popupActive);
    }
}

//редактирование профиля 
function openProfile() {  
    popupOpen(popupProfile)
    fullnameInput.value = fullname.innerText  
    subtitleInput.value = subtitle.innerText
    profileValidation._actualizeButton();
    profileValidation._resetForm();
}
  
function saveChange(event) {  
    event.preventDefault()  
    fullname.innerText = fullnameInput.value  
    subtitle.innerText = subtitleInput.value  
    popupClose(popupProfile)  
}

//просмотр фото попапа
function vievPopup(name,link){
    photoImage.src = link;
    photoDescription.textContent = name;
    popupOpen(photoPopup);
}

//открытие попапа с добавлением нового элемента
function addCard(evt) {
    evt.preventDefault();
    const card = new Card(nameInput.value, imageInput.value, '#element');
    const cardElement = card.createCard();
    elementList.prepend(cardElement);
    nameInput.value = '';
    imageInput.value = '';
    popupClose(popupImage);
}

function openAddCard() {
    popupOpen(popupImage);
    addCardValidation._actualizeButton();
    addCardValidation._resetForm();
}

addCardValidation.enableValidation();
profileValidation.enableValidation();

popupProfile.addEventListener('click', overlayPopupClose);
photoPopup.addEventListener('click', overlayPopupClose);
popupImage.addEventListener('click', overlayPopupClose);

exitPhotoButton.addEventListener('click', () => popupClose(photoPopup));
exitButton.addEventListener('click', () => popupClose(popupProfile));
exitAddButton.addEventListener('click', () => popupClose(popupImage));

addButton.addEventListener('click', openAddCard);
submitButtonAddCard.addEventListener('click', addCard);
editFormSubmitButton.addEventListener('click', saveChange);
editButton.addEventListener('click', openProfile);  

export {vievPopup};

addInitialCards();