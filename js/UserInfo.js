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
    
    setUserInfo(fullnameValue, subtitleValue) {
        this._fullname.textContent = fullnameValue.value;
        this._subtitle.textContent = subtitleValue.value;
    }
}