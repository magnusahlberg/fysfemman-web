import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class Activities {

    constructor(api) {
        this.api = api;
        this.activityTypes = [];
        this.ratings = Array.from(Array(4).keys());
        this.displayRatings = ['🙈','👎','👍','🌟'];
        this.bonusMultiplier = 0;
        this.rating = 1;
        this.units = 0;
        this.comment = '';
        this.date = new Date().toISOString().substring(0,10);
        console.log("Date: " + this.date);
        this.activityType = {};
        this.activityTypeId = '';
    }

    created() {
        this.api.getActivityTypes().then(activityTypes => {
            this.activityTypes = activityTypes
            this.activityType = this.activityTypes[0];
            this.activityTypeId = this.activityType.id;
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
        this.api.addActivity(activity);
//        .then(console.log('Added!'))
//        .catch(console.log('Error adding!'));
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