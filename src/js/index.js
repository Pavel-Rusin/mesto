import '../pages/index.css';
import Api from './Api.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import {
    validateSettings
} from './FormValidator.js';
import PopupDeleteCard from './PopupDeleteCard.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { initialCards, editButton, popupProfile, fullnameProfile, subtitleProfile, fullnameInput, subtitleInput, 
    photoPopup, imageInPopup, textInPopup, elementList, popupImage, cardTemplate, addButton, saveButtonProfile, 
    popupAvatar, avatarButton, saveButtonAvatar, saveButtonElement, popupDelete} 
from './constants.js';


// fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
//     headers: {
//         authorization: '5cdb7fd9-798d-4617-8ae3-90459ea95534'
//     }
//     })
//     .then(res => res.json())
//     .then((result) => {
//         console.log(result);
//     });


//инициализация
const profileValidation = new FormValidator(validateSettings, 'form[name="shape"]');
const addCardValidation = new FormValidator(validateSettings, 'form[name="image"]');
const avatarValidation = new FormValidator(validateSettings, 'form[name="avatar"]');

const setLoading = function (isLoading, submitButton) {
    if (isLoading === true) {
        submitButton.textContent = 'Сохранение...'
    } 
    else {
        if(submitButton.classList.contains('popup__button_type_place')) {
            submitButton.textContent = 'Создать'
        }
        else  {
            submitButton.textContent = 'Сохранить'
        }
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '5cdb7fd9-798d-4617-8ae3-90459ea95534',
        'Content-Type': 'application/json'
    }
})

api.getUserInfo()
    .then((data) => {
        api.userInfo = data
        user.setUserInfo({ name: data.name, about: data.about })
        user.setAvatar(data.avatar)
        api.getInitialCards()
            .then((cards) => {
                renderCards(cards).renderItems()
            })
            .catch((err) => {
                console.log(err)
            })
    })
    .catch((err) => {
        console.log(err)
    })

const handleUserInfo = function (userData) {
    setLoading(true, saveButtonProfile)
    api.patchUserInfo(userData.name, userData.about)
        .then((info) => {
            user.setUserInfo(info)
            profilePopup.close()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false, saveButtonProfile)
        })
}

const handleAvatar = function (linkObject) {
    setLoading(true, saveButtonAvatar)
    api.patchAvatar(linkObject.avatar)
        .then((res) => {
            user.setAvatar(res.avatar)
            avatarPopup.close()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false, saveButtonAvatar)
        })
}

const addNewCard = function (card) {
    setLoading(true, saveButtonElement)
    api.postNewCard(card.name, card.link)
        .then((card) => {
            renderCards().addNewCard(createElementCard(card))
            elementPopup.close()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false, saveButtonElement)
        })
}

const elementPopup = new PopupWithForm(popupImage, (element) => {
    addNewCard(element)
})

const profilePopup = new PopupWithForm(popupProfile, handleUserInfo)

const avatarPopup = new PopupWithForm(popupAvatar, handleAvatar)

const createElementCard = function (element) {
    const newElementCard = new Card (element, cardTemplate, handleCardClick, api.userInfo._id, handleDeleteClick, api)
    return newElementCard.createCard()
}


const renderCards = function (cards) {
    const cardsList = new Section({
        data: cards,
        renderer: (element) => {
            cardsList.appendCard(createElementCard(element))
        },
        // addNewCard: (element) => {
        //     cardsList.addItem(createElementCard(element))
        // }
      }, elementList
    )
    return cardsList
}

const popupWithImage = new PopupWithImage(photoPopup, imageInPopup, textInPopup);

const handleCardClick = function (elementImage, elementText) {
    popupWithImage.open(elementImage, elementText)
    popupWithImage.setEventListeners()
}

const infoPopup = new PopupWithForm(popupProfile, () => {
    user.setUserInfo(fullnameInput, subtitleInput)
})

const popupDeleteCard = new PopupDeleteCard(popupDelete, api);

const handleDeleteClick = function (cardId) {
    popupDeleteCard.open()
    popupDeleteCard.setEventListeners(cardId)
}

const user = new UserInfo({
    fullname: fullnameProfile,
    subtitle: subtitleProfile
})

elementPopup.setEventListeners()
profilePopup.setEventListeners()
avatarPopup.setEventListeners()

editButton.addEventListener('click', () => {
    console.log(profileValidation, "profile");
    const userInfo = user.getUserInfo()
    fullnameInput.value = userInfo.fullname
    subtitleInput.value = userInfo.subtitle
    infoPopup.open();
    profileValidation.enableValidation();
})

addButton.addEventListener('click', () => {
    console.log(addCardValidation, "add");
    elementPopup.open()
    addCardValidation.enableValidation();
})

avatarButton.addEventListener('click', () => {
    avatarPopup.open()
    avatarValidation.enableValidation();
})

// //инициализация
// const profileValidation = new FormValidator(validateSettings, 'form[name="shape"]');
// const addCardValidation = new FormValidator(validateSettings, 'form[name="image"]');


// const cardTemplate = document.querySelector('#element').content

// const popupWithImage = new PopupWithImage(photoPopup, imageInPopup, textInPopup);

// const handleCardClick = function (elementImage, elementText) {
//     popupWithImage.open(elementImage, elementText)
//     popupWithImage.setEventListeners()
// }


// const cardsList = new Section({
//     data: initialCards,
//     renderer: (element) => {
//         const newCard = new Card (element, cardTemplate, handleCardClick)
//         const cardElement = newCard.createCard()

//         cardsList.addItem(cardElement)
//     },
//   }, elementList
// )

// cardsList.renderItems()


// const user = new UserInfo({
//     fullname: fullnameProfile,
//     subtitle: subtitleProfile
// })

// const elementPopup = new PopupWithForm(popupImage, (element) => {
//     const newCard = new Card (element, cardTemplate, handleCardClick)
//     cardsList.addItem(newCard.createCard())
// })


// const infoPopup = new PopupWithForm(popupProfile, () => {
//     user.setUserInfo(fullnameInput, subtitleInput)
// })

// elementPopup.setEventListeners()
// infoPopup.setEventListeners()


// editButton.addEventListener('click', () => {
//     const userInfo = user.getUserInfo()
//     fullnameInput.value = userInfo.fullname
//     subtitleInput.value = userInfo.subtitle
//     infoPopup.open();
//     profileValidation.enableValidation();
// })


// addButton.addEventListener('click', () => {
//     elementPopup.open()
//     addCardValidation.enableValidation();
// })