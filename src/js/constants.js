export const initialCards = [
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

export const cardTemplate = document.querySelector('#element').content

// открываем попап редактирования профиля
export const editButton = document.querySelector('.profile__button_edit'); 
export const popupProfile = document.querySelector('.popup_type_profile');
export const fullnameProfile = document.querySelector('.profile__fullname'); 
export const subtitleProfile = document.querySelector('.profile__subtitle'); 
export const fullnameInput = document.querySelector('.popup__input_fullname'); 
export const subtitleInput = document.querySelector('.popup__input_subtitle'); 
export const saveButtonProfile = document.querySelector('.popup__button_type_info');

//Открываем фото попап
export const photoPopup = document.querySelector('.popup_type_photo');
export const imageInPopup = document.querySelector('.popup__image');
export const textInPopup = document.querySelector('.popup__description');

//добавляем попап добавления карточки
export const elementList = document.querySelector('.elements__list');
export const popupImage = document.querySelector('.popup_type_add-card');
export const addButton = document.querySelector('.profile__button_add');
export const saveButtonElement = document.querySelector('.popup__button_type_element');

//аватар
export const avatarButton = document.querySelector('.profile__button_avatar');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const saveButtonAvatar = document.querySelector('.popup__button_type_avatar');

//удаление карт
export const popupDelete = document.querySelector('.popup_type_delete');