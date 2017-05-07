import {WebAPI} from './web-api';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(WebAPI, Router)
export class Login {
    constructor(api,router) {
        this.api = api;
        this.router = router;
        this.mobile = '';
        this.code = '';
        this.showCode = false;
    }

    getCode() {
        this.api.getCode(this.mobile)
        .then(() => { console.log("Code sent!") })
        .catch(error => { console.log("Error: " + error) });
        this.showCode = true;
    }

    login() {
        this.api.login(this.mobile, this.code)
        .then(token => {
            console.log('Login success!');
            localStorage.setItem('token', token);
            this.router.navigateToRoute('activities');
        })
        .catch(console.log('Login failed'));
    }
}