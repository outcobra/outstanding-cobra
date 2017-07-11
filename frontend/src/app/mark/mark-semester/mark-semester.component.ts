import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {isFalsy, isNotEmpty, isNotNull, isTruthy} from '../../core/util/helper';
import {MarkService} from '../service/mark.service';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {MarkGroupDto} from '../model/mark-group.dto';
import {Subject} from 'rxjs/Subject';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';

type EditMark = {
    subjectId: number,
    markId: number,
    groupId: number
}

type EditMarkGroup = {
    subjectId: number,
    markId: number,
    groupId: number
}

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
    private _headerClasses;

    public newMark$: Subject<MarkGroupDto> = new Subject();
    public newMarkGroup$: Subject<MarkGroupDto> = new Subject();
    public deleteMark$: Subject<number> = new Subject();
    public deleteMarkGroup$: Subject<number> = new Subject();
    public editMark$: Subject<EditMark> = new Subject();
    public editMarkGroup$: Subject<MarkGroupDto> = new Subject();

    public deleteMarkOrMarkGroup$: Subject<number>;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _markService: MarkService,
                private _confirmationDialogService: ConfirmDialogService,
                private _translateService: TranslateService,
                private _responsiveHelperService: ResponsiveHelperService) {
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
        this._updateHeaderClasses({mobile: this._responsiveHelperService.isMobile()});

        this.newMark$.subscribe((markGroup) =>
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/${markGroup.id}/add`], {relativeTo: this._activatedRoute.parent})
        );

        this.newMarkGroup$.subscribe((markGroup) =>
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/add`], {relativeTo: this._activatedRoute.parent})
        );

        this._buildDeleteChain(this.deleteMark$, 'mark', this._markService.deleteMark, console.log);
        this._buildDeleteChain(this.deleteMarkGroup$, 'markGroup', this._markService.deleteMarkGroup, console.log);

        this.editMark$.subscribe(editMark => {
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${editMark.subjectId}/group/${editMark.groupId}/edit/${editMark.markId}`], {relativeTo: this._activatedRoute.parent})
        });
        this.editMarkGroup$.subscribe(markGroup => {
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/edit/${markGroup.id}`], {relativeTo: this._activatedRoute.parent});
        });

        this._responsiveHelperService.listenForBreakpointChange().subscribe(this._updateHeaderClasses.bind(this));
    }

    private _showDeleteDialog(i18nDialogKey: string, result: any): Observable<boolean> {
        return this._confirmationDialogService.open(this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.title`),
            this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.message`), result);
    }

    private _buildDeleteChain(subject: Subject<number>, entityName: string, deleteFunction: (id: number) => Observable<any>, finishFunction: (result: any) => void) {
        return subject
            .switchMap(id => this._showDeleteDialog(entityName, id))
            .filter(isNotNull)
            .switchMap(deleteFunction.bind(this._markService))
            .subscribe(finishFunction.bind(this));
    }

    public isActiveSubject(subjectId: number): boolean {
        return !(isFalsy(this.initOpenings) || isFalsy(this.initOpenings.subjectId)) && this.initOpenings.subjectId === subjectId;
    }

    public isActiveMarkGroup(groupId): boolean {
        return !(isFalsy(this.initOpenings) || isFalsy(this.initOpenings.groupId)) && this.initOpenings.groupId === groupId;
    }

    private _updateHeaderClasses(change: { mobile: boolean }) {
        this._headerClasses = change.mobile ? 'two-line-header' : '';
    }

    public isTruthy(val: any): boolean {
        return isTruthy(val);
    }


    get initOpenings(): { subjectId: number; groupId: number } {
        return this._initOpenings;
    }


    get headerClasses() {
        return this._headerClasses;
    }
}
