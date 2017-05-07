import { WebAPI } from './web-api';
import { inject, computedFrom } from 'aurelia-framework';

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

    @computedFrom('activityTypeId')
    get showActivityFields() {
        if (this.activityTypeId && this.activityTypeId != 0) {
            return true;
        }
        return false;
    }

    @computedFrom('activityType')
    get unit() {
        if (this.activityType) {
            return this.activityType["unit"]
        } else {
            return ""
        }
    }

    clear() {
        this.bonusMultiplier = '';
        this.rating = null;
        this.units = 0;
        this.comment = '';
        this.date = new Date().toISOString().substring(0,10);
        this.activityType = null;
        this.activityTypeId = null;
        this.activityTypeClass = ""
    }

    created() {
        this.api.getActivityTypes().then(activityTypes => {
            this.activityTypes = activityTypes
            this.activityTypes.unshift({id: 0, name: 'Ny aktivitet'});
            this.activityType = this.activityTypes[0];
            this.activityTypeId = this.activityType.id;
        });
        this.api.getActivityList().then(activities => {
            this.activities = activities;
        });
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

    activityTypeSelected(selectedType) {
        this.activityTypeId = selectedType;
        this.activityType = this.activityTypes.find(activityType => { return activityType.id == selectedType });
        if (this.ActivityTypeId == 0) {
            this.activityTypeClass = ""
        } else {
            this.activityTypeClass = "selected"
        }
    }
}