import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MarkDto } from 'app/mark/model/mark.dto';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { filter, skipWhile, switchMap } from 'rxjs/operators';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { DateUtil } from '../../core/services/date-util.service';
import { ResponsiveHelperService } from '../../core/services/ui/responsive-helper.service';
import { isNotEmpty, isTruthy } from '../../core/util/helper';
import { Util } from '../../core/util/util';
import { MarkGroupDto } from '../model/mark-group.dto';
import { SemesterMarkDto } from '../model/semester-mark.dto';
import { MarkService } from '../service/mark.service';

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
  private _currentSemester: boolean;

  public newMark$: Subject<MarkGroupDto> = new Subject();
  public newMarkGroup$: Subject<MarkGroupDto> = new Subject();
  public deleteMark$: Subject<MarkDto> = new Subject();
  public deleteMarkGroup$: Subject<MarkGroupDto> = new Subject();
  public editMark$: Subject<EditMark> = new Subject();
  public editMarkGroup$: Subject<EditMarkGroup> = new Subject();
  public editSubjectWeight$: Subject<MarkGroupDto> = new Subject();

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _markService: MarkService,
              private _confirmationDialogService: ConfirmDialogService,
              private _translateService: TranslateService,
              private _responsiveHelperService: ResponsiveHelperService,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._activatedRoute.data
      .subscribe((sm: { semesterMark: SemesterMarkDto }) => {
        this.semesterMark = sm.semesterMark;
        this._currentSemester = DateUtil.isBetweenDaysInclusive(moment(), DateUtil.transformToMomentIfPossible(this.semesterMark.validFrom),
          DateUtil.transformToMomentIfPossible(this.semesterMark.validTo));
      });
    this._activatedRoute.queryParamMap
      .pipe(
        filter(params => isNotEmpty(params.keys) && params.has('subjectId'))
      )
      .subscribe(params => {
        this._initOpenings = {
          subjectId: parseInt(params.get('subjectId')),
          groupId: parseInt(params.get('groupId'))
        };
      });
    this._updateHeaderClasses({ mobile: this._responsiveHelperService.isMobile() });

    // region subject initialization
    this.newMark$
      .pipe(
        skipWhile(() => !this._currentSemester)
      ).subscribe((markGroup) =>
      this._router.navigate([`subject/${markGroup.subjectId}/group/${markGroup.id}/new`],
        { relativeTo: this._activatedRoute })
    );

    this.newMarkGroup$
      .pipe(
        skipWhile(() => !this._currentSemester)
      )
      .subscribe((markGroup) =>
        this._router.navigate([`subject/${markGroup.subjectId}/group/new`],
          { relativeTo: this._activatedRoute })
      );

    this._buildDeleteChain(this.deleteMark$, 'mark', this._markService.deleteMark, (mark: MarkDto) => {
      let parentMarkGroup = this._getMarkGroupByMark(mark);
      Util.removeFirstMatch(parentMarkGroup.markValues, markValue => markValue.id === mark.id);
      this._changeDetectorRef.markForCheck();
    });
    this._buildDeleteChain(this.deleteMarkGroup$, 'markGroup', this._markService.deleteMarkGroup, (markGroup: MarkGroupDto) => {
      let subjectMarkGroup = this._getSubjectMarkGroupBySubjectId(markGroup.subjectId);
      Util.removeFirstMatch(subjectMarkGroup.markGroups, (mg) => mg.id === markGroup.id);
      this._changeDetectorRef.markForCheck();
    });

    this.editMark$
      .pipe(
        skipWhile(() => !this._currentSemester)
      )
      .subscribe(editMark =>
        this._router.navigate([`subject/${editMark.subjectId}/group/${editMark.groupId}/edit/${editMark.markId}`],
          { relativeTo: this._activatedRoute })
      );
    this.editMarkGroup$
      .pipe(
        skipWhile(() => !this._currentSemester)
      )
      .subscribe(markGroup =>
        this._router.navigate([`subject/${markGroup.subjectId}/group/edit/${markGroup.groupId}`],
          { relativeTo: this._activatedRoute })
      );

    this.editSubjectWeight$
      .pipe(
        skipWhile(() => !this._currentSemester)
      )
      .subscribe(markGroup => {
        this._markService.saveMarkGroup(markGroup)
          .pipe(
            switchMap(() => this._markService.getMarkSemesterBySemesterId(this.semesterMark.id))
          )
          .subscribe((semesterMark: SemesterMarkDto) => {
            this.semesterMark.value = semesterMark.value;
            this.semesterMark.subjects.filter(sub => sub.id === markGroup.subjectId)
              .forEach(sub => sub.subjectMarkGroup.weight = markGroup.weight);
          });
      });
    // endregion

    this._responsiveHelperService.listenForBreakpointChange().subscribe(this._updateHeaderClasses.bind(this));
  }

  // region subject helpers

  private _showDeleteDialog(i18nDialogKey: string, result: any): Observable<boolean> {
    return this._confirmationDialogService.open(this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.title`),
      this._translateService.instant(`i18n.modules.mark.dialog.${i18nDialogKey}ConfirmDelete.message`), result);
  }

  private _buildDeleteChain(subject: Subject<MarkGroupDto | MarkDto>, entityName: string, deleteFunction: (markOrGroup: MarkGroupDto | MarkDto) => Observable<MarkGroupDto | MarkDto>, finishFunction: (markOrGroup: MarkGroupDto | MarkDto) => void) {
    return subject.pipe(
      skipWhile(() => !this._currentSemester),
      switchMap(markOrGroup => this._showDeleteDialog(entityName, markOrGroup)),
      filter(isTruthy),
      switchMap(deleteFunction.bind(this._markService))
    ).subscribe(finishFunction.bind(this));

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

  private _getSubjectMarkGroupBySubjectId(subjectId: number) {
    return this.semesterMark.subjects.find(sub => sub.id == subjectId).subjectMarkGroup;
  }

  private _getMarkGroupByMark(mark: MarkDto): MarkGroupDto {
    for (let subject of this.semesterMark.subjects) {
      if (subject.subjectMarkGroup.id === mark.markGroupId) {
        return subject.subjectMarkGroup;
      }
      let group = subject.subjectMarkGroup.markGroups.find(group => group.id === mark.markGroupId);
      if (this.isTruthy(group)) {
        return group;
      }
    }
    return null;
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

  get currentSemester(): boolean {
    return this._currentSemester;
  }
}
