const editButton = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const fullname = document.querySelector('.profile__fullname');
const subtitle = document.querySelector('.profile__subtitle');
const submit = document.querySelector('.popup__submit');
const fullnameInput = document.querySelector('.popup__input_fullname');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const exitButton = document.querySelector('.popup__close');

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
    popup.classList.toggle('popup_opened')
}