import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubjectService} from "../manage/service/subject.service";
import {SubjectDto} from "../manage/model/ManageDto";
import {SchoolClassService} from "../manage/service/school-class.service";
import {ActivatedRoute} from "@angular/router";
import {TaskFilter} from "./model/TaskFilter";
import {MdDialog, MdDialogRef} from "@angular/material";
import {TaskAddDialogComponent} from "./task-add-dialog/task-add-dialog.component";

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

    private taskAddDialog: MdDialogRef<TaskAddDialogComponent>;

    private filter = {
        subjectId: 0
    };

    constructor(private taskService: TaskService,
                private dialogService: MdDialog,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchTerm: ['']
        });
        this.filterForm = this.formBuilder.group({
            subjectId: ['']
        });

        this.route.data.subscribe((data : {taskFilter: TaskFilter, tasks: Task[]}) => {
            this.filterData = data.taskFilter;
            console.log(this.filterData);
            this.tasks = this.filteredTasks = data.tasks;
        });

        this.searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this.filteredTasks = this.search(searchTerm));
    }

    addTask() {
        this.taskAddDialog = this.dialogService.open(TaskAddDialogComponent, {width: '500px', position: {top: '20px'}})
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

    filterTasks() {
        if (this.filterForm.get('subjectId').touched) {
            this.filteredTasks = this.tasks.filter(task => task.subject.id == this.filterForm.get('subjectId').value);
        }
    }

    resetFilter() {
        this.filterForm.reset();
        this.filteredTasks = this.tasks;
    }

}
