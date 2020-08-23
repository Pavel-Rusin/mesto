import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popup, imageInPopup, textInPopup) {
        super(popup);
        this._imageInPopup = imageInPopup;
        this._textInPopup = textInPopup;
    }

    open(elementImage, elementText) {
        super.open()

        this._imageInPopup.src = elementImage.src
        this._imageInPopup.alt = elementImage.alt
        this._textInPopup.textContent = elementText.textContent
    }
}