import {
    vievPopup
} from "./index.js";

export default class Card {
    constructor(text, image) {
        this._text = text;
        this._image = image;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector('#element')
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
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._text;
        this._element.querySelector('.element__text').textContent = this._text;

        return this._element;
    }
}