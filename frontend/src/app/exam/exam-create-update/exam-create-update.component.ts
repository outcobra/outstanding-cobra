import {Component, OnInit} from '@angular/core';
import {SubjectDto} from '../../manage/model/manage.dto';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExamDto} from '../model/exam.dto';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {ExamTaskDto} from '../model/exam.task.dto';
import {getIfTruthy, isNotEmpty} from 'app/core/util/helper';
import {CreateUpdateComponent} from '../../core/common/create-update-component';
import {FormUtil} from '../../core/util/form-util';
import {OCValidators} from '../../core/services/oc-validators';
import {ActivatedRoute} from '@angular/router';
import {ViewMode} from '../../core/common/view-mode';

@Component({
    selector: 'exam-create-update-dialog',
    templateUrl: './exam-create-update.component.html',
    styleUrls: ['./exam-create-update.component.scss']
})
export class ExamCreateUpdateComponent extends CreateUpdateComponent<ExamDto> implements OnInit {

    private _subjects: SubjectDto[];
    public examCreateUpdateForm: FormGroup;
    private _title: string;

    constructor(private _translateService: TranslateService,
                private _route: ActivatedRoute,
                private _responsiveHelper: ResponsiveHelperService,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._route.data.subscribe((data: { viewMode: ViewMode, subjects: Array<SubjectDto>, exam?: ExamDto }) => {
            this._subjects = data.subjects;
            this.init(data.viewMode as ViewMode, data.exam);
        });
        this.examCreateUpdateForm = this._initFormGroup();
    }

    private _formGroupForDtoOrDefault(examTask = {} as ExamTaskDto): FormGroup {
        return this._formBuilder.group({
            id: getIfTruthy(examTask, 'id', 0),
            finished: getIfTruthy(examTask, 'finished', false),
            task: getIfTruthy(examTask, 'task', ''),
            examId: this.getParamOrDefault('id', 0)
        });
    }

    private _formArrayForExamTasks(): AbstractControl[] {
        let tasks = this.getParamOrDefault('examTasks', []);
        return tasks.map((examTask) => this._formGroupForDtoOrDefault(examTask));
    }

    private _initFormGroup(): FormGroup {
        return this._formBuilder.group({
            name: [
                this.getParamOrDefault('name'),
                Validators.required
            ],
            description: [
                this.getParamOrDefault('description')
            ],
            date: [
                this.getParamOrDefault('date'),
                Validators.compose([Validators.required, OCValidators.date()])
            ],
            examTasks: this._formBuilder.array(this._formArrayForExamTasks()),
            subjectId: [
                this.getParamOrDefault('subject.id'),
                Validators.required
            ]
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
            examTasks: formValue.examTasks.filter(isNotEmpty)
        } as ExamDto;
    }

    private _getSubjectById(subjectId: number): SubjectDto {
        return this.subjects.find((subject: SubjectDto) => subject.id == subjectId);
    }

    public addExamTask() {
        this.examTaskArray.push(this._formGroupForDtoOrDefault());
    }

    public isMobile(): boolean {
        return this._responsiveHelper.isMobile();
    }

    public submit() {
        if (this.examCreateUpdateForm.valid && this.examCreateUpdateForm.dirty) {
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
