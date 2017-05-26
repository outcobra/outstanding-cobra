import {MdDateFormats} from '@angular/material/typings/core/datetime/date-formats';
// currently useless because there's no date adapter that can handle the parse format
export const OC_DATE_FORMATS: MdDateFormats = {
    parse: {
        dateInput: 'DD.MM.YYYY'
    },
    display: {
        dateInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'}
    }
};
