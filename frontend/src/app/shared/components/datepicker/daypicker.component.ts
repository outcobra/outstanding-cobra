import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {DatepickerComponent} from "./datepicker.component";

@Component({
    selector: 'daypicker',
    templateUrl: './daypicker.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
})
export class DaypickerComponent implements OnInit {
    private dayLabels: string[] = [];
    private monthLabel: string;
    private rows: any[] = [];
    private year: number;
    private month: number;

    constructor(private datePicker: DatepickerComponent) {
    }

    ngOnInit() {
        moment.locale('de', {
            weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_')
        });

        moment.weekdays(true).forEach(day => {
            let idx = moment().isoWeekday(day).isoWeekday();
            this.dayLabels[idx] = day;
        });
        this.dayLabels.splice(0, 1);
        this.year = this.datePicker.currentDate.getFullYear();
        this.month = this.datePicker.currentDate.getMonth();
        this.update();
    }

    changeMonth(direction: number) {
        let date = moment({month: this.month, year: this.year}).add(direction, 'month');
        this.year = date.year();
        this.month = date.month();
        this.update();
    }

    update() {
        this.updateView(this.year, this.month);
    }

    updateView(year: number, month: number) {
        let firstDayOfMonth = new Date(year, month, 1);
        this.monthLabel = moment(firstDayOfMonth).format('MMMM YYYY');

        let daysInMonth = new Date(year, month+1, 0).getDate();
        let dayIndex = moment().isoWeekday(firstDayOfMonth.getDay()).isoWeekday() - 1;

        let days = [];

        for (let i = 0; i < daysInMonth; i++) {
            days[i + dayIndex] = new Date(year, month, i + 1).getDate();
        }
        this.rows = this.split(days, 7);
    }

    split(array: Array<any>, length: number) {
        let out = [];
        while (array.length > 0) {
            out.push(array.splice(0, length));
        }
        return out;
    }

}
