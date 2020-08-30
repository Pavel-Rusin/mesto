import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, formSubmit) {
        super(popup);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this.submitButton = this._form.querySelector('.popup__submit')
        this._form.addEventListener('submit', (evt) => {
          if (this.submitButton.classList.contains('popup__button_inactive')) { return false }
          else {
            evt.preventDefault()
            this._formSubmit(this._getInputValues())
          }
        })
    }

    close() {
        super.close();
        this._form.reset()
    }
}