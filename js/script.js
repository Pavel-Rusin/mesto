// открываем попап редактирования профиля
const editButton = document.querySelector('.profile__button_edit'); 
const popupProfile = document.querySelector('.popup_type_profile'); 
const fullname = document.querySelector('.profile__fullname'); 
const subtitle = document.querySelector('.profile__subtitle'); 
const fullnameInput = document.querySelector('.popup__input_fullname'); 
const subtitleInput = document.querySelector('.popup__input_subtitle'); 
const exitButton = document.querySelector('.popup__profile_close');
const profileForm = document.querySelector('form[name="shape"]');

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
const addSubmit = document.querySelector('.popup__submit_image');
const addImageForm = document.querySelector('form[name="image"]');

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

//редактирование профиля
function popupToggle (popup) {
    popup.classList.toggle('popup_opened')
}
  
function openProfile() {  
    popupToggle(popupProfile)  
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
    popupToggle(popapImage);
    nameInput.value = '';
    imageInput.value = '';
});

addButton.addEventListener('click', () => popupToggle(popapImage));
exitAddButton.addEventListener('click', () => popupToggle(popapImage));
profileForm.addEventListener('submit', saveChange);
exitPhotoButton.addEventListener('click', () => popupToggle(photoPopup));
editButton.addEventListener('click', openProfile);  
exitButton.addEventListener('click', () => popupToggle(popupProfile));

//загружаем карточки
function addInitialCards() {
    initialCards.forEach((cardElement) => {
        addCard(createElement(cardElement))
    });
}
addInitialCards();