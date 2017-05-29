import * as moment from 'moment/moment';

export function dateComparator(first: Date, second: Date): number {
    let firstMoment = moment(first);
    let secondMoment = moment(second);
    if (firstMoment.isBefore(secondMoment)) {
        return -1;
    }
    if (firstMoment.isAfter(secondMoment)) {
        return 1;
    }
    return 0;
}
