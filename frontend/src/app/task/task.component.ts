import {
    AfterViewInit,
    animate,
    Component,
    OnInit,
    state,
    style,
    transition,
    trigger,
    ViewEncapsulation
} from '@angular/core';
import {TaskService} from './service/task.service';
import {Task} from './model/Task';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TaskFilter} from './model/TaskFilter';
import {MdDialog, MdDialogRef} from '@angular/material';
import {TaskCreateUpdateDialog} from './task-create-update-dialog/task-create-update-dialog.component';
import {NotificationsService} from 'angular2-notifications';
import {Util} from '../shared/util/util';
import {DialogMode} from '../common/DialogMode';
import {Observable} from 'rxjs';
import {SMALL_DIALOG} from '../shared/util/const';
import {and} from '../shared/util/helper';
import {ResponsiveHelperService} from '../shared/services/ui/responsive-helper.service';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('filterShown', [
            state('true', style({
                height: '*',
                paddingTop: '*',
                paddingBottom: '*'
            })),
            state('false', style({
                height: '0',
                paddingTop: '0',
                paddingBottom: '0'
            })),
            transition('1 => 0', animate('250ms ease-in')),
            transition('0 => 1', animate('250ms ease-out'))
        ])
    ]
})
export class TaskComponent implements OnInit, AfterViewInit {
    private _filterForm: FormGroup;
    private _searchForm: FormGroup;
    private _filteredTasks: Task[];
    private _filterData: TaskFilter;
    private _filterShown: boolean;

    private _filtered: boolean = false;
    private _tasks: Task[];

    private _taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;

    constructor(private _taskService: TaskService,
                private _dialogService: MdDialog,
                private _notificationService: NotificationsService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _formBuilder: FormBuilder,
                private _responsiveHelperService: ResponsiveHelperService) {
    }

    ngOnInit() {
        this._searchForm = this._formBuilder.group({
            searchTerm: ['']
        });
        this._filterForm = this._formBuilder.group({
            subjectId: [''],
            finished: ['']
        });

        this._route.data.subscribe((data: { taskFilter: TaskFilter, tasks: Task[] }) => {
            this._filterData = data.taskFilter;
            this._tasks = data.tasks;
            this._filteredTasks = Util.cloneArray(data.tasks);
        });

        this._searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this._filteredTasks = Util.cloneArray(this.search(searchTerm)));

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && !this._taskService.hasCache()) {
                this._taskService.readAll().subscribe((tasks: Task[]) => {
                    this._tasks = tasks;
                    this._filteredTasks = this._filtered ? Util.cloneArray(tasks) : this._filterTasks(Util.cloneArray(tasks));
                });
            }
        });
    }

    ngAfterViewInit() {
        this._filterShown = !this._responsiveHelperService.isMobile();
        Observable.concat(
            this._responsiveHelperService.listenForResize(),
            this._responsiveHelperService.listenForOrientationChange()
        ).subscribe(() => {
            if (!this._responsiveHelperService.isMobile()) {
                this._filterShown = true;
            }
        });
    }

    public addTask() {
        this._taskCreateUpdateDialog = this._dialogService.open(TaskCreateUpdateDialog, SMALL_DIALOG);
        this._taskCreateUpdateDialog.componentInstance.init(DialogMode.NEW, null);
        this._taskCreateUpdateDialog.afterClosed()
            .flatMap((value) => {
                if (!value) return Observable.empty();
                return this._taskService.create(value)
            })
            .subscribe((task: Task) => {
                this._notificationService.success('i18n.modules.task.notification.add.title', 'i18n.modules.task.notification.add.message');
                this._tasks.push(task);
                this._checkFilter(task);
            });
    }

    private _checkFilter(task: Task) {
        let filter = this._buildFilterPredicate();
        if (!this._filtered || this._filterTask(task, filter)) { // only add to filteredTasks if it passes the current filter
            this._filteredTasks.push(task);
        }
    }

    public markTaskAsDone(task: Task) {
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
     * @returns {Task[]}
     */
    public search(term: string) {
        return this._tasks.filter((task: Task) => {
            let lcTerm = term.toLowerCase();
            return task.name.toLowerCase().includes(lcTerm) ||
                task.description.toLowerCase().includes(lcTerm) ||
                task.subject.name.toLowerCase().includes(lcTerm);
        });
    }

    private _filterTasks(tasks: Task[]): Task[] {
        if (!this._filtered) return tasks;
        let filter = this._buildFilterPredicate();
        return tasks.filter(task => this._filterTask(task, filter));

    }

    private _filterTask(task: Task, filter: Predicate<Task>): boolean {
        if (!this._filtered) return true;
        return filter(task);
    }

    private _buildFilterPredicate(): Predicate<Task> {
        let predicates: Predicate<Task>[] = [];
        if (this._filterForm.get('subjectId').touched) {
            predicates.push((task: Task) => task.subject.id == this._filterForm.get('subjectId').value);
        }
        if (this._filterForm.get('finished').value) {
            predicates.push((task: Task) => task.progress != 100);
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
        this._filterShown = !(this._filterShown)
    }


    get filterForm(): FormGroup {
        return this._filterForm;
    }

    get searchForm(): FormGroup {
        return this._searchForm;
    }

    get filteredTasks(): Task[] {
        return this._filteredTasks;
    }

    get filterData(): TaskFilter {
        return this._filterData;
    }

    get filterShown(): boolean {
        return this._filterShown;
    }
}
