import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {isFalsy, isNotEmpty, isNotNull, isTruthy} from '../../core/util/helper';
import {MarkService} from '../service/mark.service';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {MarkDto} from '../model/mark.dto';
import {MarkGroupDto} from '../model/mark-group.dto';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'mark-semester',
    templateUrl: './mark-semester.component.html',
    styleUrls: ['./mark-semester.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkSemesterComponent implements OnInit {
    public semesterMark: SemesterMarkDto;
    private _initOpenings: {
        subjectId: number,
        groupId: number
    };

    public newMark$: Subject<MarkGroupDto> = new Subject();
    public newMarkGroup$: Subject<MarkGroupDto> = new Subject();
    public deleteMark$: Subject<number> = new Subject();
    public deleteMarkGroup$: Subject<number> = new Subject();

    public deleteMarkOrMarkGroup$: Subject<number>;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _markService: MarkService,
                private _confirmationDialogService: ConfirmDialogService,
                private _translateService: TranslateService) {
    }

    ngOnInit() {
        this._activatedRoute.data
            .subscribe((sm: { semesterMark: SemesterMarkDto }) => this.semesterMark = sm.semesterMark);
        this._activatedRoute.queryParamMap
            .filter(params => isNotEmpty(params.keys) && params.has('subjectId'))
            .subscribe(params => {
                this._initOpenings = {
                    subjectId: parseInt(params.get('subjectId')),
                    groupId: parseInt(params.get('groupId'))
                }
            });

        this.newMark$
            .subscribe((markGroup) => this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/${markGroup.id}/add`],
                {relativeTo: this._activatedRoute.parent}));

        this.newMarkGroup$
            .subscribe((markGroup) => this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/add`],
                {relativeTo: this._activatedRoute.parent}));

        this.deleteMark$
            .switchMap(id => this._showDeleteDialog('mark', id))
            .filter(isNotNull)
            .switchMap(id => this._markService.deleteMark(id))
            .subscribe(console.log); // todo cleanup

        this.deleteMarkGroup$
            .switchMap(id => this._showDeleteDialog('markGroup', id))
            .filter(isNotNull)
            .switchMap(id => this._markService.deleteMarkGroup(id))
            .subscribe(console.log); // todo cleanup
    }

    public addMarkGroup(subjectMarkGroup: MarkGroupDto) {

    }

    private _showDeleteDialog(i18nDialogKey: string, result: any): Observable<boolean> {
        return this._confirmationDialogService.open(this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.title`),
            this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.message`), result);
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

    public isActiveSubject(subjectId: number): boolean {
        return !(isFalsy(this.initOpenings) || isFalsy(this.initOpenings.subjectId)) && this.initOpenings.subjectId === subjectId;
    }

    public isActiveMarkGroup(groupId): boolean {
        return !(isFalsy(this.initOpenings) || isFalsy(this.initOpenings.groupId)) && this.initOpenings.groupId === groupId;
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


    get initOpenings(): { subjectId: number; groupId: number } {
        return this._initOpenings;
    }
}
