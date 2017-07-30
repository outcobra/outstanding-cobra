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
import {Util} from '../../core/util/util';

@Component({
    selector: 'exam-create-update-dialog',
    templateUrl: './exam-create-update-dialog.component.html',
    styleUrls: ['./exam-create-update-dialog.component.scss']
})
export class ExamCreateUpdateDialog extends CreateUpdateDialog<ExamDto> implements OnInit {

    private _subjects: SubjectDto[]
    public examCreateUpdateForm: FormGroup
    public today: Date = new Date()
    private _title: string

    constructor(private _translateService: TranslateService,
                private _subjectService: SubjectService,
                private _dialogRef: MdDialogRef<ExamCreateUpdateDialog>,
                private _examService: ExamService,
                private _examTaskService: ExamTaskService,
                private _responsiveHelper: ResponsiveHelperService,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._subjectService.readAll().subscribe((subjects: SubjectDto[]) => this._subjects = subjects)
        this.examCreateUpdateForm = this._initFormGroup()
    }

    private _initFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required],
            description: [this.getParamOrDefault('description')],
            date: this._formBuilder.group({
                examDate: [this.getParamOrDefault('date'), Validators.required]
            }),
            subjectId: [this.getParamOrDefault('subjectId'), Validators.required]
        })
    }

    private _formToExamDto(): ExamDto {
        let formValue = this.examCreateUpdateForm.value;
        let subject = this._getSubjectById(formValue.subjectId);
        //TODO add tasks and mark to dialog
        return {
            id: this.isEditMode() ? this.param.id : 0,
            name: formValue.name,
            description: formValue.description,
            date: formValue.date.examDate,
            subjectName: subject.name,
            subjectId: subject.id,
            mark: null,
            examTasks: []
        } as ExamDto
    }

    public isMobile(): boolean {
        return this._responsiveHelper.isMobile()
    }

    public submit() {
        if (this.examCreateUpdateForm.valid && this.examCreateUpdateForm.dirty) {
            this._dialogRef.close(this._formToExamDto())
        } else {
            Util.revalidateForm(this.examCreateUpdateForm)
        }
    }

    private _getSubjectById(subjectId: number): SubjectDto {
        return this.subjects.find((subject: SubjectDto) => subject.id == subjectId);
    }

    get title(): string {
        var i18nTitle = 'i18n.modules.exam.add'
        if (super.isEditMode()) {
            i18nTitle = 'i18n.modules.exam.edit'
        }
        this._title = this._translateService.instant(i18nTitle)
        return this._title
    }

    get subjects(): SubjectDto[] {
        return this._subjects;
    }
}
