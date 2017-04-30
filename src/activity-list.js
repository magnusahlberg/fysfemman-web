import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class ActivityList {
    constructor(api) {
        this.api = api;
        this.activities = [];
    }

    created() {
        this.api.getActivityList().then(activities => this.activities = activities);
    }
}