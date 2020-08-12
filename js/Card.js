import {
    vievPopup
} from "./index.js";

export default class Card {
    constructor(text, image, cardSelector) {
        this._text = text;
        this._image = image;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        
        return cardElement;
    }

    _likeElement() {
        this._element.querySelector('.element__like').classList.toggle('element__like_clicked');
    }

    _deleteElement() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeElement();
        });

        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteElement();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            vievPopup(this._text, this._image);
        });
    }

    createCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector('.element__image');
        this._setEventListeners();
        elementImage.src = this._image;
        elementImage.alt = this._text; 
        this._element.querySelector('.element__text').textContent = this._text;

        return this._element;
    }
}