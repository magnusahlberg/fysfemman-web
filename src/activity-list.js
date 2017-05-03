import {WebAPI} from './web-api';
import {inject,bindable} from 'aurelia-framework';

@inject(WebAPI)
export class ActivityList {
    @bindable activities;

    constructor(api) {
        this.api = api;
    }

}