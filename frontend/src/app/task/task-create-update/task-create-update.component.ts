import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubjectDto} from '../../manage/model/manage.dto';
import {OCValidators} from '../../core/services/oc-validators';
import {TaskDto} from '../model/task.dto';
import {CreateUpdateComponent} from '../../core/common/create-update-component';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {DateUtil} from '../../core/services/date-util.service';
import {FormUtil} from '../../core/util/form-util';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewMode} from '../../core/common/view-mode';
import {TaskService} from '../service/task.service';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';
import {Observable} from 'rxjs';
import {SchoolClassSubjectDto} from '../model/school-class-subject.dto';

@Component({
    selector: './task-create-update-dialog',
    templateUrl: './task-create-update.component.html',
    styleUrls: ['./task-create-update.component.scss']
})
export class TaskCreateUpdateComponent extends CreateUpdateComponent<TaskDto> implements OnInit {
    private _taskCreateUpdateForm: FormGroup;
    private _schoolClassSubjects: Array<SchoolClassSubjectDto>;
    private _today: Moment = moment();

    private _submitFunction: (task: TaskDto) => Observable<TaskDto>;

    constructor(private _formBuilder: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _taskService: TaskService,
                private _notificationService: NotificationWrapperService,
                private responsiveHelperService: ResponsiveHelperService) {
        super();
    }

    ngOnInit() {
        this._route.data.subscribe((data: { viewMode: ViewMode, subjects: Array<SchoolClassSubjectDto>, task?: TaskDto }) => {
            this.init(data.viewMode as ViewMode, data.task);
            this._schoolClassSubjects = data.subjects;
            this._submitFunction = this.isEditMode()
                ? this._taskService.update
                : this._taskService.create
        });

        this._taskCreateUpdateForm = this._formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required],
            description: [this.getParamOrDefault('description')],
            dates: this._formBuilder.group({
                    todoDate: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('todoDate')),
                        Validators.compose([Validators.required, OCValidators.date()])],
                    dueDate: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('dueDate')),
                        Validators.compose([Validators.required, OCValidators.date()])]
                },
                {
                    validator: OCValidators.dateFromIsBeforeDateTo('todoDate', 'dueDate', true)
                }),
            effort: [this.getParamOrDefault('effort'), Validators.required],
            subjectId: [this.getParamOrDefault('subject.id'), Validators.required]
        });
    }

    public submit() {
        if (this._taskCreateUpdateForm.valid && this._taskCreateUpdateForm.dirty) {
            this._submitFunction.call(this._taskService, this._formToTask())
                .switchMap(() => this._router.navigateByUrl('/task'))
                .subscribe(() => this._notificationService.success('i18n.modules.task.notification.createUpdateSuccess.title', 'i18n.modules.task.notification.createUpdateSuccess.message'));
        }
        else {
            FormUtil.revalidateForm(this._taskCreateUpdateForm);
        }
    }

    private _formToTask(): TaskDto {
        let formValue = this._taskCreateUpdateForm.value;
        let subject = this._schoolClassSubjects.reduce((prev: Array<SubjectDto>, curr: SchoolClassSubjectDto) => prev.concat(curr.subjects), [])
            .find(subject => subject.id === formValue.subjectId);
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            name: formValue.name,
            description: formValue.description,
            todoDate: formValue.dates.todoDate,
            dueDate: formValue.dates.dueDate,
            effort: formValue.effort,
            progress: 0,
            subject: subject
        } as TaskDto
    }

    public isMobile() {
        return this.responsiveHelperService.isMobile();
    }

    get taskCreateUpdateForm(): FormGroup {
        return this._taskCreateUpdateForm;
    }

    get schoolClassSubjects(): Array<SchoolClassSubjectDto> {
        return this._schoolClassSubjects;
    }

    get today(): Moment {
        return this._today;
    }
}
