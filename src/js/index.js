import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import {
    validateSettings
} from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { initialCards, editButton, popupProfile, fullnameProfile, subtitleProfile, fullnameInput, subtitleInput, 
    photoPopup, imageInPopup, textInPopup, elementList, popupImage, addButton} from './constants.js';
import '../pages/index.css';

//инициализация
const profileValidation = new FormValidator(validateSettings, 'form[name="shape"]');
const addCardValidation = new FormValidator(validateSettings, 'form[name="image"]');


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