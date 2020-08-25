export default class Popup{
    constructor(popup) {
        this._popup = popup;
    }

    open () {
        this._popup.classList.add('popup_opened');
        //this.setEventListeners();
        document.addEventListener('keyup', (evt) => this._exitEscKey(evt));
    }

    close () {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('click', this._click);
        document.removeEventListener('keyup', (evt) => this._exitEscKey(evt));
    }

    _exitEscKey(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // _overlayPopupClose(evt) {
    //     if (evt.target === this._popup) {
    //         this.close();
    //     }
    //     if (evt.target.classList.contains('popup__close')) {
    //         this.close();
    //     }
    // }

    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close');
        this._closeButton.addEventListener('mousedown', () => {
            this.close()
        })
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target !== evt.currentTarget) { return }
            this.close()
        })
    }
}