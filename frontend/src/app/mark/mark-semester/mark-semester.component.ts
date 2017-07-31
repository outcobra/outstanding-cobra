import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SemesterMarkDto} from '../model/semester-mark.dto';
import {isNotEmpty, isNotNull, isTruthy} from '../../core/util/helper';
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
    public editMarkGroup$: Subject<EditMarkGroup> = new Subject();
    public editSubjectWeight$: Subject<MarkGroupDto> = new Subject();

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
                };
            });
        this._updateHeaderClasses({mobile: this._responsiveHelperService.isMobile()});

        // region subject initialization
        this.newMark$.subscribe((markGroup) =>
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/${markGroup.id}/add`],
                {relativeTo: this._activatedRoute.parent})
        );

        this.newMarkGroup$.subscribe((markGroup) =>
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/add`],
                {relativeTo: this._activatedRoute.parent})
        );

        this._buildDeleteChain(this.deleteMark$, 'mark', this._markService.deleteMark, console.log);
        this._buildDeleteChain(this.deleteMarkGroup$, 'markGroup', this._markService.deleteMarkGroup, console.log);

        this.editMark$.subscribe(editMark => {
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${editMark.subjectId}/group/${editMark.groupId}/edit/${editMark.markId}`],
                {relativeTo: this._activatedRoute.parent});
        });
        this.editMarkGroup$.subscribe(markGroup => {
            console.log(markGroup);
            this._router.navigate([`semester/${this.semesterMark.id}/subject/${markGroup.subjectId}/group/edit/${markGroup.groupId}`],
                {relativeTo: this._activatedRoute.parent});
        });

        this.editSubjectWeight$.subscribe(markGroup => {
            this._markService.saveMarkGroup(markGroup)
                .switchMap(() => this._markService.getMarkSemesterBySemesterId(this.semesterMark.id))
                .subscribe((semesterMark: SemesterMarkDto) => {
                    this.semesterMark.value = semesterMark.value;
                    this.semesterMark.subjects.filter(sub => sub.id === markGroup.subjectId)
                        .forEach(sub => sub.subjectMarkGroup.weight = markGroup.weight);
                }); // TODO open opened things again
        });
        // endregion

        this._responsiveHelperService.listenForBreakpointChange().subscribe(this._updateHeaderClasses.bind(this));
    }

    // region subject helpers

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

    // endregion

    // region view helpers
    public isActiveSubject(subjectId: number): boolean {
        return this._isActiveProp(() => this.initOpenings.subjectId, subjectId);
    }

    public isActiveMarkGroup(groupId): boolean {
        return this._isActiveProp(() => this.initOpenings.groupId, groupId);
    }

    private _isActiveProp(propExtractor: Function, search: number) {
        if (isTruthy(this.initOpenings)) {
            let prop = propExtractor.call(this);
            return isTruthy(prop) && prop === search;
        }
        return false;
    }

    private _updateHeaderClasses(change: { mobile: boolean }) {
        this._headerClasses = change.mobile ? 'two-line-header' : '';
    }

    public isTruthy(val: any): boolean {
        return isTruthy(val);
    }

    // endregion

    get initOpenings(): { subjectId: number; groupId: number } {
        return this._initOpenings;
    }

    get headerClasses() {
        return this._headerClasses;
    }
}
