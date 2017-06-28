import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {isTruthy} from '../../core/util/helper';
import {MarkService} from '../service/mark.service';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {MarkDto} from '../model/mark.dto';
import {MarkGroupDto} from '../model/mark-group.dto';

@Component({
    selector: 'mark-semester',
    templateUrl: './mark-semester.component.html',
    styleUrls: ['./mark-semester.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkSemesterComponent implements OnInit {
    public semesterMark: SemesterMarkDto;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _markService: MarkService,
                private _confirmationDialogService: ConfirmDialogService,
                private _translateService: TranslateService) {
    }

    ngOnInit() {
        this._activatedRoute.data
            .subscribe((sm: { semesterMark: SemesterMarkDto }) => this.semesterMark = sm.semesterMark);
    }

    public addMark(markGroup?: MarkGroupDto) {
        if (isTruthy(markGroup.parentGroupId)) {
            this._router.navigate([`subject/${markGroup.subjectId}/group/${markGroup.id}/add`], {relativeTo: this._activatedRoute});
        } else {
            this._router.navigate([`subject/${markGroup.subjectId}/add`], {relativeTo: this._activatedRoute});
        }
    }

    public addMarkGroup(subjectMarkGroup: MarkGroupDto) {

    }

    public deleteMark(id: number) {
        this._deleteMarkOrMarkGroup('mark', this._markService.deleteMark.bind(this._markService, id))
    }

    public deleteMarkGroup(id: number) {
        this._deleteMarkOrMarkGroup('markGroup', this._markService.deleteMarkGroup.bind(this._markService, id))
    }

    public editMark(mark: MarkDto) {
        this._router.navigate(['mark', 'add']);
    }

    private _deleteMarkOrMarkGroup(i18nDialogKey: string, deleteFunction: (id: number) => Observable<any>) {
        this._confirmationDialogService.open(this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.title`),
            this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.message`))
            .filter(isTruthy)
            .switchMap(deleteFunction)
            .subscribe(() => console.log(i18nDialogKey));
    }

    public isTruthy(val: any): boolean {
        return isTruthy(val);
    }

}
