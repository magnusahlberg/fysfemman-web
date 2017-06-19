import {bindable, computedFrom} from 'aurelia-framework';

export class ActivitySummary {
    @bindable activities;

    constructor() {
    }

    @computedFrom('activities')
    get totalPoints() {
        let points = this.activities.reduce(function(acc, val) {
            return acc + val["points"];
        }, 0);
        return Math.round(points * 1000) / 1000.0;
    }


}