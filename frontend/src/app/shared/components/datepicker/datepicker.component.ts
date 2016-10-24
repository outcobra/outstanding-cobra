import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import * as moment from 'moment';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnInit {
    @Input() private opened: boolean = true;
    @Input() private currentDate: Date;
    @Input() private today: Date = new Date();
    @Input() private initDate: Date;
    @Input() private minDate: Date;
    @Input() private maxDate: Date;
    @Input() private pickerMode: string;

    constructor() {
    }

    ngOnInit() {
        console.log(moment.weekdays());
    }

    open() {
        this.opened = !this.opened;
    }

}
