import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'daypicker',
    templateUrl: './daypicker.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
})
export class DaypickerComponent implements OnInit {
    private dayLabels: string[];

    constructor() {
    }

    ngOnInit() {
        this.dayLabels = moment.weekdays().map((day) => day.substr(0, 1));
    }

}
