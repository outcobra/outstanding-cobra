import {Injectable} from "@angular/core";

@Injectable()
export class DateUtil {

    // technically min and max date
    public readonly MIN_DATE = new Date(1000, 1, 1);
    public readonly MAX_DATE = new Date(9999, 11, 31);

    public isSameDay(date1: Date, date2: Date): boolean {
        return date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear();
    }

    public isBetweenDay(date: Date, lowerBound: Date, upperBound: Date): boolean {
        let normalizedDate = this.normalizeDate(date);
        return this.normalizeDate(lowerBound) <= normalizedDate && normalizedDate <= this.normalizeDate(upperBound);
    }

    public normalizeDate(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    public isMinDate(date: Date) {
        return this.isSameDay(date, this.MIN_DATE);
    }

    public isMaxDate(date: Date) {
        return this.isSameDay(date, this.MAX_DATE);
    }

}
