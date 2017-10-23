import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {SubjectDto} from '../../manage/model/manage.dto';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExamDto} from '../model/exam.dto';
import {TranslateService} from '@ngx-translate/core';
import {SubjectService} from '../../manage/service/subject.service';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {ExamTaskDto} from '../model/exam.task.dto';
import {getIfTruthy} from 'app/core/util/helper';
import {CreateUpdateComponent} from '../../core/common/create-update-component';
import {FormUtil} from '../../core/util/form-util';
import {OCValidators} from '../../core/services/oc-validators';
import {ExamTaskService} from '../service/exam-task.service';
import {DateUtil} from '../../core/services/date-util.service';

@Component({
    selector: 'exam-create-update-dialog',
    templateUrl: './exam-create-update-dialog.component.html',
    styleUrls: ['./exam-create-update-dialog.component.scss']
})
export class ExamCreateUpdateDialog extends CreateUpdateComponent<ExamDto> implements OnInit {

    private _subjects: SubjectDto[];
    public examCreateUpdateForm: FormGroup;
    private _title: string;

    constructor(private _translateService: TranslateService,
                private _subjectService: SubjectService,
                private _dialogRef: MatDialogRef<ExamCreateUpdateDialog>,
                private _responsiveHelper: ResponsiveHelperService,
                private _formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) data) {
        super(data.mode, data.param);
    }

    ngOnInit() {
        this._subjectService.readAll().subscribe((subjects: SubjectDto[]) => this._subjects = subjects);
        this.examCreateUpdateForm = this._initFormGroup();
    }

    private _formGroupForDtoOrDefault(examTask = {} as ExamTaskDto): FormGroup {
        return this._formBuilder.group({
            id: getIfTruthy(examTask, 'id', 0),
            finished: [getIfTruthy(examTask, 'finished', false)],
            task: [getIfTruthy(examTask, 'task', ''), Validators.required],
            examId: [this.getParamOrDefault('id', 0)]
        });
    }

    private _formArrayForExamTasks(): AbstractControl[] {
        let tasks = this.getParamOrDefault('examTasks', []);
        return tasks.map((examTask) => this._formGroupForDtoOrDefault(examTask));
    }

    private _initFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required],
            description: [this.getParamOrDefault('description')],
            date: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('date')),
                Validators.compose([Validators.required, OCValidators.date()])],
            examTasks: this._formBuilder.array(this._formArrayForExamTasks()),
            subjectId: [this.getParamOrDefault('subject.id'), Validators.required]
        });
    }

    private _formToExamDto(): ExamDto {
        let formValue = this.examCreateUpdateForm.value;
        let subject = this._getSubjectById(formValue.subjectId);
        let id = this.isEditMode() ? this.param.id : 0;
        return {
            id: id,
            name: formValue.name,
            description: formValue.description,
            date: formValue.date,
            subject: subject,
            mark: null,
            examTasks: formValue.examTasks
        } as ExamDto;
    }

    private _getSubjectById(subjectId: number): SubjectDto {
        return this.subjects.find((subject: SubjectDto) => subject.id == subjectId);
    }

    public addExamTask() {
        this.examTaskArray.push(this._formGroupForDtoOrDefault());
    }

    public removeExamTask(index: number) {
        this.examTaskArray.removeAt(index);
        this.examTaskArray.markAsDirty();
    }

    public isMobile(): boolean {
        return this._responsiveHelper.isMobile();
    }

    public submit() {
        if (this.examCreateUpdateForm.valid && this.examCreateUpdateForm.dirty) {
            this._dialogRef.close(this._formToExamDto());
        } else {
            FormUtil.revalidateForm(this.examCreateUpdateForm);
        }
    }

    get title(): string {
        let i18nTitle = 'i18n.modules.exam.add';
        if (super.isEditMode()) {
            i18nTitle = 'i18n.modules.exam.edit';
        }
        return this._title = this._translateService.instant(i18nTitle);
    }

    get subjects(): SubjectDto[] {
        return this._subjects;
    }

    get examTaskArray(): FormArray {
        return this.examCreateUpdateForm.get('examTasks') as FormArray;
    };

}
