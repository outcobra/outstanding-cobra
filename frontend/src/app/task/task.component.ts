import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskService} from './service/task.service';
import {TaskDto} from './model/task.dto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SubjectFilterDto} from './model/subject.filter.dto';
import {MdDialog, MdDialogRef} from '@angular/material';
import {TaskCreateUpdateDialog} from './task-create-update-dialog/task-create-update-dialog.component';
import {Util} from '../core/util/util';
import {ViewMode} from '../core/common/view-mode';
import {Observable} from 'rxjs';
import {SMALL_DIALOG} from '../core/util/const';
import {and} from '../core/util/helper';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {OCMediaChange} from '../core/services/ui/oc-media-change';
import {slideUpDownAnimation} from '../core/animations/animations';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [slideUpDownAnimation]
})
export class TaskComponent implements OnInit, AfterViewInit {
    private _filterForm: FormGroup;
    private _searchForm: FormGroup;
    private _filteredTasks: TaskDto[];
    private _filterData: SubjectFilterDto;
    private _filterShown: boolean;

    private _filtered: boolean = true;
    private _tasks: TaskDto[];

    private _taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;

    constructor(private _taskService: TaskService,
                private _dialogService: MdDialog,
                private _notificationService: NotificationWrapperService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _formBuilder: FormBuilder,
                private _responsiveHelperService: ResponsiveHelperService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._initForms();
        this._getAndInitTasksFromResolver();
        this._initFormChangeSubscriptions();
        this._refreshTasksAfterRouteChangeAndIfCacheWasDeleted();
    }

    ngAfterViewInit() {
        this._filterShown = !this._responsiveHelperService.isMobile();
        Observable.merge(
            this._responsiveHelperService.listenForBreakpointChange(),
            this._responsiveHelperService.listenForOrientationChange())
            .filter(change => !change.mobile)
            .subscribe((change: OCMediaChange) => this._filterShown = true);
        this._changeDetectorRef.detectChanges();
    }

    //region initialization

    private _getAndInitTasksFromResolver() {
        this._route.data.subscribe((data: { taskFilter: SubjectFilterDto, tasks: TaskDto[] }) => {
            this._filterData = data.taskFilter;
            this._refreshTasksWithFilter(data.tasks);
        });
    }

    private _refreshTasksWithFilter(tasks: TaskDto[]) {
        this._tasks = tasks;
        this._filteredTasks = this._filterTasks(Util.cloneArray(tasks));
    }

    private _refreshTasksAfterRouteChangeAndIfCacheWasDeleted() {
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && !this._taskService.hasCache()) {
                this._taskService.readAll().subscribe((tasks) => this._refreshTasksWithFilter(tasks));
            }
        });
    }

    private _initForms() {
        this._searchForm = this._formBuilder.group({
            searchTerm: ['']
        });
        this._filterForm = this._formBuilder.group({
            subjectId: [''],
            finished: [true]
        });
    }

    private _initFormChangeSubscriptions() {
        this._searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this._filteredTasks = Util.cloneArray(this.search(searchTerm)));

        this._filterForm.valueChanges
            .subscribe(() => this.doFilter());
    }

    //endregion

    public addTask() {
        this._taskCreateUpdateDialog = this._dialogService.open(TaskCreateUpdateDialog, this._responsiveHelperService.getMobileOrGivenDialogConfig(SMALL_DIALOG));
        this._taskCreateUpdateDialog.componentInstance.init(ViewMode.NEW, null);
        this._taskCreateUpdateDialog.afterClosed()
            .flatMap((value) => {
                if (!value) return Observable.empty();
                return this._taskService.create(value)
            })
            .subscribe((task: TaskDto) => {
                this._notificationService.success('i18n.modules.task.notification.add.title', 'i18n.modules.task.notification.add.message');
                this._tasks.push(task);
                this._checkFilterThenAddToFilteredList(task);
            });
    }

    //region filtering

    private _checkFilterThenAddToFilteredList(task: TaskDto) {
        let filter = this._buildFilterPredicate();
        if (!this._filtered || this._filterTask(task, filter)) {
            this._filteredTasks.push(task);
        }
    }

    public markTaskAsDone(task: TaskDto) {
        if (task.progress == 100) return;
        this._taskService.updateProgress(task.id, 100)
            .subscribe(() => {
                task.progress = 100;
                if (this._filtered) this.doFilter();
            });
    }

    /**
     * returns all tasks which contain the term in the name, the description or the subject name
     * @param term
     * @returns {TaskDto[]}
     */
    public search(term: string) {
        return this._tasks.filter((task: TaskDto) => {
            let lcTerm = term.toLowerCase();
            return task.name.toLowerCase().includes(lcTerm) ||
                task.description.toLowerCase().includes(lcTerm) ||
                task.subject.name.toLowerCase().includes(lcTerm);
        });
    }

    private _filterTasks(tasks: TaskDto[]): TaskDto[] {
        if (!this._filtered) return tasks;
        let filter = this._buildFilterPredicate();
        return tasks.filter(task => this._filterTask(task, filter));

    }

    private _filterTask(task: TaskDto, filter: Predicate<TaskDto>): boolean {
        if (!this._filtered) return true;
        return filter(task);
    }

    private _buildFilterPredicate(): Predicate<TaskDto> {
        let predicates: Predicate<TaskDto>[] = [];
        let formValue = this._filterForm.value;
        if (formValue.subjectId) {
            predicates.push((task: TaskDto) => task.subject.id == formValue.subjectId);
        }
        if (formValue.finished) {
            predicates.push((task: TaskDto) => task.progress != 100);
        }
        return and(predicates);
    }

    public resetFilter() {
        this._filtered = false;
        this._filterForm.reset();
        this._filteredTasks = Util.cloneArray(this._tasks);
    }

    public doFilter() {
        this._filtered = true;
        this._filteredTasks = Util.cloneArray(this._filterTasks(this._tasks));
    }

    public changeFilterVisibility() {
        this._filterShown = !this._filterShown;
    }

    get filterForm(): FormGroup {
        return this._filterForm;
    }

    get searchForm(): FormGroup {
        return this._searchForm;
    }

    get filteredTasks(): TaskDto[] {
        return this._filteredTasks;
    }

    get filterData(): SubjectFilterDto {
        return this._filterData;
    }

    get filterShown(): boolean {
        return this._filterShown;
    }

    //endregion
}
