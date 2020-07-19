// открываем попап редактирования профиля
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button_edit'); 
const popupProfile = document.querySelector('.popup_type_profile'); 
const fullname = document.querySelector('.profile__fullname'); 
const subtitle = document.querySelector('.profile__subtitle'); 
const fullnameInput = document.querySelector('.popup__input_fullname'); 
const subtitleInput = document.querySelector('.popup__input_subtitle'); 
const exitButton = document.querySelector('.popup__profile_close');
const profileForm = document.querySelector('form[name="shape"]');
const editButtonSubmit = document.querySelector('.popup__submit_profile');

//Открываем фото попап
const photoPopup = document.querySelector('.popup_type_photo')
const photoImage = document.querySelector('.popup__image');
const photoDescription = document.querySelector('.popup__description');
const exitPhotoButton = document.querySelector('.popup__photo_close'); 

//добавляем попап добавления карточки
const elementList = document.querySelector('.elements__list');
const popapImage = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__button_add');
const nameInput = document.querySelector('.popup__input_name'); 
const imageInput = document.querySelector('.popup__input_image');
const exitAddButton = document.querySelector('.popup__image_close'); 
const addImageForm = document.querySelector('form[name="image"]');
const addButtonSubmit = document.querySelector('.popup__submit_image');

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

// создаем темплейт
const createTemplate = document.querySelector('#element').content;

function createElement(elem){
    const elementTemplate = createTemplate.cloneNode(true);
    const elementLink = elementTemplate.querySelector('.element__link');
    const elementImage = elementTemplate.querySelector('.element__image');
    const deleteButton = elementTemplate.querySelector('.element__delete');
    const elementText = elementTemplate.querySelector('.element__text');
    const likeButtons = elementTemplate.querySelector('.element__like');
    elementImage.src = elem.link;
    elementImage.alt = elem.name;
    elementText.textContent = elem.name;
    deleteButton.addEventListener('click',deleteElement);
    likeButtons.addEventListener('click',likeElement);
    elementLink.addEventListener('click',() => vievPopup(elementText.textContent, elementImage.src));
    return elementTemplate;
}

//удаление элемента
function deleteElement(item) {
    item.currentTarget.closest('.element').remove();
}

//ставим и убираем лайк
function likeElement(evt) {
    evt.target.classList.toggle('element__like_clicked');
}

//открытие и закрытие попапов
function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
    document.addEventListener('keyup', exitEscKey);
}

function exitEscKey(evt) {
    const popupActive = document.querySelector('.popup_opened');
    if (evt.code === 'Escape' && popupActive) {
        popupToggle(popupActive);
    }
}

function overlayPopupClose(evt) {
    const popupActive = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')) {
        popupToggle(popupActive);
    }
}

//event.currentTarget === event.target

//редактирование профиля 
function openProfile() {  
    popupToggle(popupProfile)
    resetForm(popupProfile)
    enableButton(editButtonSubmit,'popup__button_disabled');
    fullnameInput.value = fullname.innerText  
    subtitleInput.value = subtitle.innerText
}
  
function saveChange(event) {  
    event.preventDefault()  
    fullname.innerText = fullnameInput.value  
    subtitle.innerText = subtitleInput.value  
    popupToggle(popupProfile)  
}

//просмотр фото попапа
function vievPopup(name,link){
    photoImage.src = link;
    photoDescription.textContent = name;
    popupToggle(photoPopup);
};

//создание карточек
function addCard(card) {
    elementList.prepend(card);
}




//открытие попапа с добавлением нового элемента
addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = {
      name: nameInput.value,
      link: imageInput.value
    };
    addCard(createElement(card))
    nameInput.value = '';
    imageInput.value = '';
    popupToggle(popapImage);
    resetForm(popapImage);
    disableButton(addButtonSubmit,'popup__button_disabled');
});

popupProfile.addEventListener('click', overlayPopupClose);
photoPopup.addEventListener('click', overlayPopupClose);
popapImage.addEventListener('click', overlayPopupClose);

exitPhotoButton.addEventListener('click', () => popupToggle(photoPopup));
exitButton.addEventListener('click', () => popupToggle(popupProfile));
addButton.addEventListener('click', () => popupToggle(popapImage));
exitAddButton.addEventListener('click', () => popupToggle(popapImage));

profileForm.addEventListener('submit', saveChange);
editButton.addEventListener('click', openProfile);  

//загружаем карточки
function addInitialCards() {
    initialCards.forEach((cardElement) => {
        addCard(createElement(cardElement))
    });
}
addInitialCards();