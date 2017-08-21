import {MdDateFormats} from '@angular/material/typings/core/datetime/date-formats';

export const OC_DATE_FORMATS: MdDateFormats = {
    parse: {
        dateInput: 'DD.MM.Y'
    },
    display: {
        dateInput: 'DD.MM.Y',
        monthYearLabel: 'MMM Y',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM Y'
    }
};
