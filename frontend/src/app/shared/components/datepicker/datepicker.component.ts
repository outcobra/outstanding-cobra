import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import * as moment from 'moment';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnInit {
    @Input() public opened: boolean = true;
    @Input() public currentDate: Date;
    @Input() public today: Date = new Date();
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public pickerMode: string;


    constructor() {
    }

    ngOnInit() {
        this.currentDate = this.today;
    }

    open() {
        this.opened = !this.opened;
    }

}
