import * as moment from 'moment/moment';
import {ExamDto} from '../../exam/model/exam.dto';

export function dateComparator(first: Date|string, second: Date|string): number {
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

export function examByNameComparator(first: ExamDto, second: ExamDto): number {
    let currentName = first.name.toLowerCase();
    let comparedToName = second.name.toLowerCase();
    if (currentName == comparedToName) {
        return 0
    } else if (currentName > comparedToName) {
        return 1
    }
    return -1
}
