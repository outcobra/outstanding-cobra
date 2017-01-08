import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TaskFilter} from "./model/TaskFilter";
import {MdDialog, MdDialogRef} from "@angular/material";
import {TaskAddDialogComponent} from "./task-add-dialog/task-add-dialog.component";
import {NotificationsService} from "angular2-notifications";
import {Util, and} from "../shared/services/util";

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

    private taskAddDialog: MdDialogRef<TaskAddDialogComponent>;

    constructor(private taskService: TaskService,
                private dialogService: MdDialog,
                private notificationService: NotificationsService,
                private route: ActivatedRoute,
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
    }

    addTask() {
        this.taskAddDialog = this.dialogService.open(TaskAddDialogComponent, {width: '500px', position: {top: '20px'}})
        this.taskAddDialog.afterClosed()
            .subscribe((result) => {
                if (!result) return;
                this.taskService.create(result)
                    .subscribe((task: Task) => {
                        this.notificationService.success('i18n.modules.task.notification.add.title', 'i18n.modules.task.notification.add.message');
                        this.tasks.push(task);
                        if (!this.isFiltered) return;
                        let filter = this.buildFilterPredicate();
                        if (this.filterTask(task, filter)) { // only add to filteredTasks if it passes the current filter
                            this.filteredTasks.push(task);
                        }
                    });


            });
    }

    markTaskAsDone(task: Task) {
        if (task.progress != 100) {
            task.progress = 100;
            this.taskService.update(task)
                .subscribe();
        }
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

}
