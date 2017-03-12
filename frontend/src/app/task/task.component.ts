import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TaskFilter} from "./model/TaskFilter";
import {MdDialog, MdDialogRef} from "@angular/material";
import {TaskCreateUpdateDialog} from "./task-create-update-dialog/task-create-update-dialog.component";
import {NotificationsService} from "angular2-notifications";
import {Util} from "../shared/util/util";
import {DialogMode} from "../common/DialogMode";
import {Observable} from "rxjs";
import {SMALL_DIALOG} from "../shared/util/const";
import {and} from "../shared/util/helper";

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
    private filterForm: FormGroup;
    private searchForm: FormGroup;
    private tasks: Task[];
    private filteredTasks: Task[];
    private filterData: TaskFilter;
    private isFiltered: boolean = false;
    private isFilterShown: boolean = false;

    private taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;

    constructor(private taskService: TaskService,
                private dialogService: MdDialog,
                private notificationService: NotificationsService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchTerm: ['']
        });
        this.filterForm = this.formBuilder.group({
            subjectId: [''],
            finished: ['']
        });

        this.route.data.subscribe((data: {taskFilter: TaskFilter, tasks: Task[]}) => {
            this.filterData = data.taskFilter;
            this.tasks = data.tasks;
            this.filteredTasks = Util.cloneArray(data.tasks);
        });

        this.searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this.filteredTasks = Util.cloneArray(this.search(searchTerm)));

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && !this.taskService.hasCache()) {
                this.taskService.readAll().subscribe((tasks: Task[]) => {
                    this.tasks = tasks;
                    this.filteredTasks = this.isFiltered ? Util.cloneArray(tasks) : this.filterTasks(Util.cloneArray(tasks));
                });
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
        if (!this.isFiltered || this.filterTask(task, filter)) { // only add to filteredTasks if it passes the current filter
            this.filteredTasks.push(task);
        }
    }

    markTaskAsDone(task: Task) {
        if (task.progress == 100) return;
        this.taskService.updateProgress(task.id, 100)
            .subscribe(() => {
                task.progress = 100;
                if (this.isFiltered) this.doFilter();
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
        if (!this.isFiltered) return tasks;
        let filter = this.buildFilterPredicate();
        return tasks.filter(task => this.filterTask(task, filter));

    }

    filterTask(task: Task, filter: Predicate<Task>): boolean {
        if (!this.isFiltered) return true;
        return filter(task);
    }

    buildFilterPredicate(): Predicate<Task> {
        let predicates: Predicate<Task>[] = [];
        if (this.filterForm.get('subjectId').touched) {
            predicates.push((task: Task) => task.subject.id == this.filterForm.get('subjectId').value);
        }
        if (this.filterForm.get('finished').value) {
            predicates.push((task: Task) => task.progress != 100);
        }
        return and(predicates);
    }

    resetFilter() {
        this.isFiltered = false;
        this.filterForm.reset();
        this.filteredTasks = Util.cloneArray(this.tasks);
    }

    doFilter() {
        this.isFiltered = true;
        this.filteredTasks = Util.cloneArray(this.filterTasks(this.tasks));
    }

    changeFilterVisibility() {
        this.isFilterShown = !(this.isFilterShown)
    }
}
