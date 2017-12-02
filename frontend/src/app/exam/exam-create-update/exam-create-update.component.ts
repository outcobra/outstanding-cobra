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
import {ActivatedRoute, Router} from '@angular/router';
import {ViewMode} from '../../core/common/view-mode';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';
import {ExamService} from '../service/exam.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'exam-create-update-dialog',
    templateUrl: './exam-create-update.component.html',
    styleUrls: ['./exam-create-update.component.scss']
})
export class ExamCreateUpdateComponent extends CreateUpdateComponent<ExamDto> implements OnInit {
    private _subjects: SubjectDto[];
    private _examCreateUpdateForm: FormGroup;

    private _submitFunction: (exam: ExamDto) => Observable<ExamDto>;

    constructor(private _translateService: TranslateService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _notificationService: NotificationWrapperService,
                private _examService: ExamService,
                private _responsiveHelper: ResponsiveHelperService,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._route.data.subscribe((data: { viewMode: ViewMode, subjects: Array<SubjectDto>, exam?: ExamDto }) => {
            this.init(data.viewMode as ViewMode, data.exam);
            this._subjects = data.subjects;
            this._submitFunction = this.isEditMode()
                ? this._examService.update
                : this._examService.create
        });
        this._examCreateUpdateForm = this._initFormGroup();
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

    private _formToExam(): ExamDto {
        let formValue = this._examCreateUpdateForm.value;
        let subject = this._getSubjectById(formValue.subjectId);
        let id = this.isEditMode() ? this.param.id : 0;
        return {
            id: id,
            name: formValue.name,
            description: formValue.description,
            date: formValue.date,
            subject: subject,
            mark: null,
            examTasks: formValue.examTasks.filter(examTask => isNotEmpty(examTask.task))
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
        if (this._examCreateUpdateForm.valid && this._examCreateUpdateForm.dirty) {
            this._submitFunction.call(this._examService, this._formToExam())
                .switchMap(() => this._router.navigateByUrl('/exam'))
                .subscribe(() => this._notificationService.success('i18n.modules.exam.notification.createUpdateSuccess.title', 'i18n.modules.exam.notification.createUpdateSuccess.message'));
        } else {
            FormUtil.revalidateForm(this._examCreateUpdateForm);
        }
    }

    get subjects(): SubjectDto[] {
        return this._subjects;
    }

    get examTaskArray(): FormArray {
        return this._examCreateUpdateForm.get('examTasks') as FormArray;
    };

    get examCreateUpdateForm(): FormGroup {
        return this._examCreateUpdateForm;
    }
}
