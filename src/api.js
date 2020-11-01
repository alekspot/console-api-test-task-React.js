import Sendsay from 'sendsay-api';
import {deleteCookie, setCookie} from './utils';

class Api extends Sendsay {
    constructor() {
        super();
        this.setSessionFromCookie();
    }

    isAuth() {
        return !!this.session;
    }

    requestLogin(login, password, sublogin) {
        return this.login({
            login,
            sublogin,
            password,
        }).then(() => setCookie('sendsay_session', this.session));
    }

    logOut() {
        return this.request({action: 'logout'}).then(
            () => {
                this.session = null;
                deleteCookie('sendsay_session');
            }
        );
    }

    getUserData() {
        return this.request({action: 'pong'}).then(({account, sublogin}) => ({account, sublogin}));
    }
}

export const api = new Api();