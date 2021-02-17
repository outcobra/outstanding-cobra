import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getIfTruthy, isFalsy, isNotEmpty } from 'app/core/util/helper';
import { Observable } from 'rxjs';
import { CreateUpdateComponent } from '../../core/common/create-update-component';
import { ViewMode } from '../../core/common/view-mode';
import { NotificationWrapperService } from '../../core/notifications/notification-wrapper.service';
import { OCValidators } from '../../core/services/oc-validators';
import { ResponsiveHelperService } from '../../core/services/ui/responsive-helper.service';
import { FormUtil } from '../../core/util/form-util';
import { SubjectDto } from '../../manage/model/manage.dto';
import { SchoolClassSubjectDto } from '../../task/model/school-class-subject.dto';
import { ExamDto } from '../model/exam.dto';
import { ExamTaskDto } from '../model/exam.task.dto';
import { ExamService } from '../service/exam.service';

@Component({
  selector: 'exam-create-update-dialog',
  templateUrl: './exam-create-update.component.html',
  styleUrls: ['./exam-create-update.component.scss']
})
export class ExamCreateUpdateComponent extends CreateUpdateComponent<ExamDto> implements OnInit {
  private _schoolClassSubjects: Array<SchoolClassSubjectDto>;
  private _examCreateUpdateForm: FormGroup;

  private _submitFunction: (exam: ExamDto) => Observable<ExamDto>;

  private _dirtyTasks: Array<number> = [];

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
    this._route.data.subscribe((data: { viewMode: ViewMode, subjects: Array<SchoolClassSubjectDto>, exam?: ExamDto }) => {
      this.init(data.viewMode as ViewMode, data.exam);
      this._schoolClassSubjects = data.subjects;
      this._submitFunction = this.isEditMode()
        ? this._examService.update
        : this._examService.create;
    });
    this._examCreateUpdateForm = this._initFormGroup();
  }

  public addExamTask(formControl: AbstractControl, index) {
    if (this.examTaskArray.length < 15
      && this._dirtyTasks.indexOf(index) === -1
      && (isFalsy(formControl) || isNotEmpty(formControl.value['task']))) {
      this.examTaskArray.push(this._formGroupForDtoOrDefault());
      this._dirtyTasks.push(index);
    }
  }

  public removeTask(index) {
    this.examTaskArray.removeAt(index);
    this._dirtyTasks.pop();
    this.examTaskArray.markAsDirty();
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
    tasks.push({});
    return tasks.map((examTask) => this._formGroupForDtoOrDefault(examTask));
  }

  private _formToExam(): ExamDto {
    let formValue = this._examCreateUpdateForm.value;
    let subject = this._schoolClassSubjects.reduce((prev: Array<SubjectDto>, curr: SchoolClassSubjectDto) => prev.concat(curr.subjects), [])
      .find(subject => subject.id === formValue.subjectId);
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

  get schoolClassSubjects(): Array<SchoolClassSubjectDto> {
    return this._schoolClassSubjects;
  }

  get examTaskArray(): FormArray {
    return this._examCreateUpdateForm.get('examTasks') as FormArray;
  };

  get examCreateUpdateForm(): FormGroup {
    return this._examCreateUpdateForm;
  }
}

