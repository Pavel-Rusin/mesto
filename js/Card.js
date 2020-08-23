export default class Card {
    constructor(element, template, openPopup) {
        this._name = element.name;
        this._link = element.link;
        this._template = template;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        return this._template.cloneNode(true);
    }

    _likeElement(evt) {
        evt.target.classList.toggle('element__like_clicked');
    }

    _deleteElement(evt) {
        evt.target.closest('.element').remove();
    }

    _setCardListeners(elementImage, elementText) {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likeElement(evt)
        });

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._deleteElement(evt)
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopup(elementImage, elementText)
        })
    }

    createCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector('.element__image');
        const elementText = this._element.querySelector('.element__text');
        this._setCardListeners(elementImage, elementText);
        elementImage.src = this._link
        elementImage.alt = this._name
        elementText.textContent = this._name

        return this._element;
    }
}