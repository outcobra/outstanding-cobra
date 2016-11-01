export class DatePickerMaxDateSmallerThanMinDateError extends Error {
    constructor() {
        super();
        this.message = 'datepicker: maxDate is smaller or equal to minDate';
    }

}
