import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
    constructor(popup, api) {
        super(popup);
        this._api = api;
    }

    setEventListeners(cardId) {
        super.setEventListeners()
        const deleteButton = this._popup.querySelector('.popup__submit')
        deleteButton.addEventListener('click', () => {
            this._deleteClickHandler(cardId)
        })
    }

    _deleteClickHandler(cardId) {
        this._api.deleteCard(cardId)
            .then(res => {
                const card = document.getElementById(cardId)
                card.remove()
                this.close()
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}