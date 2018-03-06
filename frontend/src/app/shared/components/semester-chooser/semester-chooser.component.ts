import {Component, OnInit} from '@angular/core';
import {ActiveSemesterService} from '../../../core/services/semester/active-semester.service';
import {SemesterDto} from '../../../manage/model/manage.dto';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'semester-chooser',
    templateUrl: 'semester-chooser.component.html',
    styleUrls: ['semester-chooser.component.scss']
})
export class SemesterChooserComponent implements OnInit {
    private _semesters$: Subject<SemesterDto[]> = new Subject<SemesterDto[]>();

    constructor(private _activeSemesterService: ActiveSemesterService) {

    }

    ngOnInit(): void {
        //this._activeSemesterService.getSemestersByUser().subscribe(this._semesters$.next)
    }
}
