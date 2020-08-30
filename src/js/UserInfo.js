export default class UserInfo {
    constructor ({ fullname, subtitle }) {
        this._fullname = fullname;
        this._subtitle = subtitle;
    }

    getUserInfo() {
        return {
            fullname: this._fullname.textContent,
            subtitle: this._subtitle.textContent
        }
    }
    
    setUserInfo({ name, about }) {
        this._fullname.textContent = name
        this._subtitle.textContent = about
    }

    setAvatar(avatar) {
        document.querySelector('.profile__avatar').style.backgroundImage = 'url('+avatar+')'
    }
}