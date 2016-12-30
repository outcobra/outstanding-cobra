import {Component, OnInit, ViewEncapsulation, style, keyframes, animate, transition, trigger} from "@angular/core";
import * as moment from "moment";
import {DatepickerComponent} from "./datepicker.component";
import {DateUtil} from "../../services/date-util.service";
import {Util} from "../../services/util";

@Component({
    selector: 'daypicker',
    templateUrl: './daypicker.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('daypickerAnimation', [
            transition('* => left', [
                animate(180, keyframes([
                    style({transform: 'translateX(105%)', offset: 0.5}),
                    style({transform: 'translateX(-130%)', offset: 0.51}),
                    style({transform: 'translateX(0)', offset: 1})
                ]))
            ]),
            transition('* => right', [
                animate(180, keyframes([
                    style({transform: 'translateX(-105%)', offset: 0.5}),
                    style({transform: 'translateX(130%)', offset: 0.51}),
                    style({transform: 'translateX(0)', offset: 1})
                ]))
            ])
        ])
    ]
})
export class DaypickerComponent implements OnInit {
    private dayLabels: string[] = [];
    private monthLabel: string;
    private rows: any[] = [];
    private year: number;
    private month: number;
    private animate: string;

    constructor(private datePicker: DatepickerComponent) {
    }

    ngOnInit() {
        moment.updateLocale('de', {
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

    selectDay(date: Date) {
        if (!this.isDisabled(date) && !this.isActive(date)) {
            this.datePicker.selectDate(moment(date).toDate());
        }
    }

    changeMonth(direction: number) {
        let date = moment({month: this.month, year: this.year}).add(direction, 'month');
        this.year = date.year();
        this.month = date.month();
        this.update();
        this.animateDayPicker(direction > 0 ? 'right' : 'left');
    }

    update() {
        this.updateView(this.year, this.month);
    }

    updateView(year: number, month: number) {
        let firstDayOfMonth = new Date(year, month, 1);
        this.monthLabel = moment(firstDayOfMonth).format('MMMM YYYY');

        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let dayIndex = moment().isoWeekday(firstDayOfMonth.getDay()).isoWeekday() - 1;

        let days = [];

        for (let i = 0; i < daysInMonth; i++) {
            days[i + dayIndex] = new Date(year, month, i + 1);
        }
        this.rows = Util.split(days, 7);
    }

    isDisabled(date: Date) {
        return !DateUtil.isBetweenDay(date, this.datePicker.minDate, this.datePicker.maxDate);
    }

    isActive(date: Date) {
        return DateUtil.isSameDay(this.datePicker.currentDate, date);
    }

    setDateSpanClasses(date: Date) {
        return {
            active: this.isActive(date),
            disabled: this.isDisabled(date)
        };
    }

    animateDayPicker(direction: string) {
        this.animate = direction;
        setTimeout(() => this.animate = 'reset', 200);
    }

}
