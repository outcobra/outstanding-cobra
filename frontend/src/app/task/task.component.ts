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
import {and, negate} from '../shared/util/helper';
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
    public filterForm: FormGroup;
    public searchForm: FormGroup;
    public filteredTasks: Task[];
    public filterData: TaskFilter;
    public filterShown: boolean;

    private filtered: boolean = false;
    private tasks: Task[];

    public taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;

    constructor(private taskService: TaskService,
                private dialogService: MdDialog,
                private notificationService: NotificationsService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private responsiveHelperService: ResponsiveHelperService) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchTerm: ['']
        });
        this.filterForm = this.formBuilder.group({
            subjectId: [''],
            finished: [true]
        });

        this.route.data.subscribe((data: { taskFilter: TaskFilter, tasks: Task[] }) => {
            this.filterData = data.taskFilter;
            this.tasks = data.tasks;
            this.filteredTasks = Util.cloneArray(data.tasks)
                .filter(negate(this.taskService.isFinished));
        });

        this.searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this.filteredTasks = Util.cloneArray(this.search(searchTerm)));

        this.filterForm.valueChanges
            .do(() => console.log('hello'))
            .subscribe(() => this.doFilter());

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && !this.taskService.hasCache()) {
                this.taskService.readAll().subscribe((tasks: Task[]) => {
                    this.tasks = tasks;
                    this.filteredTasks = this.filtered ? Util.cloneArray(tasks) : this.filterTasks(Util.cloneArray(tasks));
                });
            }
        });
    }

    ngAfterViewInit() {
        this.filterShown = !this.responsiveHelperService.isMobile();
        Observable.concat(
            this.responsiveHelperService.listenForResize(),
            this.responsiveHelperService.listenForOrientationChange()
        ).subscribe(() => {
            if (!this.responsiveHelperService.isMobile()) {
                this.filterShown = true;
            }
        });
    }

    addTask() {
        this.taskCreateUpdateDialog = this.dialogService.open(TaskCreateUpdateDialog, SMALL_DIALOG);
        this.taskCreateUpdateDialog.componentInstance.init(DialogMode.NEW, null);
        this.taskCreateUpdateDialog.afterClosed()
            .flatMap((value) => {
                if (!value) return Observable.empty();
                return this.taskService.create(value)
            })
            .subscribe((task: Task) => {
                this.notificationService.success('i18n.modules.task.notification.add.title', 'i18n.modules.task.notification.add.message');
                this.tasks.push(task);
                this.checkFilter(task);
            });
    }

    checkFilter(task: Task) {
        let filter = this.buildFilterPredicate();
        if (!this.filtered || this.filterTask(task, filter)) { // only add to filteredTasks if it passes the current filter
            this.filteredTasks.push(task);
        }
    }

    markTaskAsDone(task: Task) {
        if (task.progress == 100) return;
        this.taskService.updateProgress(task.id, 100)
            .subscribe(() => {
                task.progress = 100;
                if (this.filtered) this.doFilter();
            });
    }

    /**
     * returns all tasks which contain the term in the name, the description or the subject name
     * @param term
     * @returns {Task[]}
     */
    search(term: string) {
        return this.tasks.filter((task: Task) => {
            let lcTerm = term.toLowerCase();
            return task.name.toLowerCase().includes(lcTerm) ||
                task.description.toLowerCase().includes(lcTerm) ||
                task.subject.name.toLowerCase().includes(lcTerm);
        });
    }

    filterTasks(tasks: Task[]): Task[] {
        if (!this.filtered) return tasks;
        let filter = this.buildFilterPredicate();
        return tasks.filter(task => this.filterTask(task, filter));

    }

    filterTask(task: Task, filter: Predicate<Task>): boolean {
        if (!this.filtered) return true;
        return filter(task);
    }

    buildFilterPredicate(): Predicate<Task> {
        let predicates: Predicate<Task>[] = [];
        if (this.filterForm.get('subjectId').value) {
            predicates.push((task: Task) => task.subject.id == this.filterForm.get('subjectId').value);
        }
        if (this.filterForm.get('finished').value) {
            predicates.push((task: Task) => task.progress != 100);
        }
        return and(predicates);
    }

    resetFilter() {
        this.filtered = false;
        this.filterForm.reset();
        this.filteredTasks = Util.cloneArray(this.tasks);
    }

    doFilter() {
        this.filtered = true;
        this.filteredTasks = Util.cloneArray(this.filterTasks(this.tasks));
    }

    changeFilterVisibility() {
        this.filterShown = !(this.filterShown)
    }
}
