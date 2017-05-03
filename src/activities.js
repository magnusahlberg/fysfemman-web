import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class Activities {

    constructor(api) {
        this.api = api;
        this.activities = [];
        this.activityTypes = [];
        this.ratings = Array.from(Array(4).keys());
        this.displayRatings = ['🙈','👎','👍','🌟'];
        this.clear();
    }

    clear() {
        this.bonusMultiplier = '';
        this.rating = 2;
        this.units = 0;
        this.comment = '';
        this.date = new Date().toISOString().substring(0,10);
        this.activityType = {};
        this.activityTypeId = 0;
    }

    created() {
        this.api.getActivityTypes().then(activityTypes => {
            this.activityTypes = activityTypes
            this.activityType = this.activityTypes[0];
            this.activityTypeId = this.activityType.id;
        });
        this.api.getActivityList().then(activities => this.activities = activities);
    }

    addActivity() {
        let activity = {
            date: this.date,
            rating: parseInt(this.rating),
            activityType: this.activityTypeId,
            units: parseFloat(this.units),
            bonusMultiplier: parseFloat(this.bonusMultiplier),
            comment: this.comment
        }
        this.api.addActivity(activity)
        .then(activity => {
            console.log('Added!');
            this.activities.unshift(activity);
            this.clear();
        })
        .catch(error => { console.log('Error adding. ' + error)});
    }

    unitFromActivityType(type) {
        let activityType = this.activityTypes[type];
        if (activityType != null) {
            return activityType["unit"]
        } else {
            return ""
        }
    }

    activityTypeSelected(selectedType) {
        this.activityTypeId = selectedType;
        this.activityType = this.activityTypes.find(activityType => { return activityType.id == selectedType });
    }
}