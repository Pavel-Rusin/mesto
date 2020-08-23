import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import {
    validateSettings
} from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// открываем попап редактирования профиля
const editButton = document.querySelector('.profile__button_edit'); 
const popupProfile = document.querySelector('.popup_type_profile');
const fullnameProfile = document.querySelector('.profile__fullname'); 
const subtitleProfile = document.querySelector('.profile__subtitle'); 
const fullnameInput = document.querySelector('.popup__input_fullname'); 
const subtitleInput = document.querySelector('.popup__input_subtitle'); 

//Открываем фото попап
const photoPopup = document.querySelector('.popup_type_photo');
const imageInPopup = document.querySelector('.popup__image');
const textInPopup = document.querySelector('.popup__description');

//добавляем попап добавления карточки
const elementList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__button_add');

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

const cardTemplate = document.querySelector('#element').content

const popupWithImage = new PopupWithImage(photoPopup, imageInPopup, textInPopup);

const handleCardClick = function (elementImage, elementText) {
    popupWithImage.open(elementImage, elementText)
    popupWithImage.setEventListeners()
}


const cardsList = new Section({
    data: initialCards,
    renderer: (element) => {
        const newCard = new Card (element, cardTemplate, handleCardClick)
        const cardElement = newCard.createCard()

        cardsList.addItem(cardElement)
    },
  }, elementList
)

cardsList.renderItems()


const user = new UserInfo({
    fullname: fullnameProfile,
    subtitle: subtitleProfile
})

const elementPopup = new PopupWithForm(popupImage, (element) => {
    const newCard = new Card (element, cardTemplate, handleCardClick)
    cardsList.addItem(newCard.createCard())
})


const infoPopup = new PopupWithForm(popupProfile, () => {
    user.setUserInfo(fullnameInput, subtitleInput)
})

elementPopup.setEventListeners()
infoPopup.setEventListeners()


editButton.addEventListener('click', () => {
    const userInfo = user.getUserInfo()
    fullnameInput.value = userInfo.fullname
    subtitleInput.value = userInfo.subtitle
    infoPopup.open();
    profileValidation.resetForm();
    profileValidation.actualizeButton();
})


addButton.addEventListener('click', () => {
    elementPopup.open()
    addCardValidation.resetForm();
    addCardValidation.actualizeButton();
})

profileValidation.enableValidation();
addCardValidation.enableValidation();