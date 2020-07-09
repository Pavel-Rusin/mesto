// открываем попап редактирования профиля
const editButton = document.querySelector('.profile__button_edit'); 
const popupProfile = document.querySelector('.popup_type_profile'); 
const fullname = document.querySelector('.profile__fullname'); 
const subtitle = document.querySelector('.profile__subtitle'); 
const submit = document.querySelector('.popup__submit'); 
const fullnameInput = document.querySelector('.popup__input_fullname'); 
const subtitleInput = document.querySelector('.popup__input_subtitle'); 
const exitButton = document.querySelector('.popup__profile_close'); 
 
editButton.addEventListener('click', popupDisplayOn); 
exitButton.addEventListener('click', popupDisplayOff); 
 
submit.addEventListener('click', saveChange); 
 
function popupDisplayOn() { 
    popupToggle() 
    fullnameInput.value = fullname.innerText 
    subtitleInput.value = subtitle.innerText 
} 
 
function popupDisplayOff() { 
    popupToggle() 
} 
 
function saveChange(event) { 
    event.preventDefault() 
    fullname.innerText = fullnameInput.value 
    subtitle.innerText = subtitleInput.value 
    popupDisplayOff() 
} 
 
const popupToggle = function () { 
    popupProfile.classList.toggle('popup_opened') 
} 

//добавляем попап добавления карточки
const elementList = document.querySelector('.elements__list');
const popapImage = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__button_add');
const elementText = document.querySelector('.element__text');
const elementImage = document.querySelector('.element__image');
const nameInput = document.querySelector('.popup__input_name'); 
const imageInput = document.querySelector('.popup__input_image');
const exitAddButton = document.querySelector('.popup__image_close'); 
const addSubmit = document.querySelector('.popup__submit_image');

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

//удаление элемента
function deleteElement(item) {
    item.currentTarget.closest('.element').remove();
}

//ставим и убираем лайк
function likeElement(evt) {
    evt.target.classList.toggle('element__like_clicked');
}

//открытие попапа с добавлением нового элемента
const popupAddToggle = function () { 
    popapImage.classList.toggle('popup_opened') 
} 

addButton.addEventListener('click', () => popupAddToggle());
exitAddButton.addEventListener('click', () => popupAddToggle());

addSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    const card = {
      name: nameInput.value,
      link: imageInput.value
    };
    elementList.prepend(createElement(card));
    popupAddToggle(popapImage);
    nameInput.value = '';
    imageInput.value = '';
});

//Открываем фото попап
const photoPopup = document.querySelector('.popup_type_photo')
const photoImage = document.querySelector('.popup__image');
const photoDescription = document.querySelector('.popup__description');
const exitPhotoButton = document.querySelector('.popup__photo_close');

const popupPhotoToggle = function () { 
    photoPopup.classList.toggle('popup_opened') 
} 


exitPhotoButton.addEventListener('click', () => popupPhotoToggle());

function vievPopup(name,link){
    photoImage.src = link;
    photoDescription.textContent = name;
    popupPhotoToggle(photoPopup);
};

//загружаем карточки
function addCard() {
    initialCards.forEach((cardElement) => {
        elementList.prepend(createElement(cardElement));
    });
}
addCard();