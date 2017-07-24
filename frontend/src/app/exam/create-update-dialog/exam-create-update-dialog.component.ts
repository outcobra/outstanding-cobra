import {MdDialogRef} from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {SubjectDto} from '../../manage/model/manage.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateUpdateDialog} from '../../core/common/create-update-dialog';
import {ExamDto} from '../model/exam.dto';
import {TranslateService} from '@ngx-translate/core';
import {SubjectService} from '../../manage/service/subject.service';
import {ExamService} from '../service/exam.service';
import {ExamTaskService} from '../service/exam-task.service';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';

@Component({
    selector: 'exam-create-update-dialog',
    templateUrl: './exam-create-update-dialog.component.html',
    styleUrls: ['./exam-create-update-dialog.component.scss']
})
export class ExamCreateUpdateDialogComponent extends CreateUpdateDialog<ExamDto> implements OnInit {

    private _subjects: SubjectDto[]
    private _createUpdateExamForm: FormGroup
    private _today: Date = new Date()
    private _title: string

    constructor(private _translateService: TranslateService,
                private _subjectService: SubjectService,
                private dialogRef: MdDialogRef<ExamCreateUpdateDialogComponent>,
                private _examService: ExamService,
                private _examTaskService: ExamTaskService,
                private _responsiveHelper: ResponsiveHelperService,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._subjectService.getCurrentSubjects().subscribe((subjects: SubjectDto[]) => this._subjects = subjects)
        this._createUpdateExamForm = this._initFormGroup()
    }

    private _initFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: [Validators.required],
            description: [Validators.required],
            date: this._formBuilder.group({
                examDate: [Validators.required]
            }),
            subjectId: [Validators.required]
        })
    }

    public isMobile(): boolean {
        return this._responsiveHelper.isMobile()
    }

    get title(): string {
        var i18nTitle = 'i18n.modules.exam.add'
        if (super.isEditMode()) {
            i18nTitle = 'i18n.modules.exam.edit'
        }
        this._title = this._translateService.instant(i18nTitle)
        return this._title
    }


}
