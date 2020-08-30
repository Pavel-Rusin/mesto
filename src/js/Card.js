export default class Card {
    constructor(element, template, openPopupWithImage, myId, openPopupDeleteCard, api) {
        this._name = element.name;
        this._link = element.link;
        this._id = element._id;
        this._likes = element.likes;
        this._owner = element.owner;
        this._template = template;
        this._myId = myId;
        this._openPopupWithImage = openPopupWithImage;
        this._openPopupDeleteCard = openPopupDeleteCard;
        this._api = api;
    }

    _getTemplate() {
        return this._template.cloneNode(true);
    }

    createCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector('.element__image');
        const elementText = this._element.querySelector('.element__text');
        const element = this._element.querySelector('.element');
        this._elementLike = this._element.querySelector('.element__like_place');

        elementImage.src = this._link
        elementImage.alt = this._name
        elementText.textContent = this._name
        element.id = this._id

        if (this._likes.length>=1) {
            this._elementLike.textContent = this._likes.length;
        }

        if (this._owner._id === this._myId) {
            const cardDelete = document.createElement('button');
            cardDelete.classList.add('element__delete', 'transition');
            cardDelete.setAttribute('type', 'button');
            this._element.querySelector('.element').appendChild(cardDelete)

            cardDelete.addEventListener('click', () => {
                this._openPopupDeleteCard(this._id)
            })
        }

        this._likes.forEach((like) => {
            if(like._id === this._myId) {
                const likeButton = this._element.querySelector('.element__like')
                likeButton.classList.add('element__like_clicked')
            }
        })

        this._setCardListeners(elementImage, elementText)
        return this._element
    }

    _like(evt) {
        if(evt.target.classList.contains('element__like_clicked')) {
            this._api.deleteLike(this._id)
                .then(res => {
                    evt.target.classList.remove('element__like_clicked')
                    if (res.likes.length>=1) {
                    this._elementLike.textContent = res.likes.length
                    } else {
                    this._elementLike.textContent = ""
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this._api.putLike(this._id)
                .then(res => {
                   evt.target.classList.add('element__like_clicked');
                   this._elementLike.textContent = res.likes.length
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    _setCardListeners(elementImage, elementText) {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => { this._like(evt) })
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupWithImage(elementImage, elementText)
        })
    }
}
