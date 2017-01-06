import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubjectService} from "../manage/service/subject.service";
import {SubjectDto} from "../manage/model/ManageDto";
import {SchoolClassService} from "../manage/service/school-class.service";
import {ActivatedRoute} from "@angular/router";
import {TaskFilter} from "./model/TaskFilter";

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
    private subjects: SubjectDto[];
    private filteredTasks: Task[];
    private filterData: TaskFilter;

    private filter = {
        subjectId: 0
    };

    constructor(private taskService: TaskService,
                private route: ActivatedRoute,
                private schoolClassService: SchoolClassService,
                private subjectService: SubjectService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchTerm: ['']
        });
        this.filterForm = this.formBuilder.group({
            institutionId: [''],
            schoolClassId: [''],
            schoolYearId: [''],
            semesterId: [''],
            subjectId: ['']
        });

        this.route.data.subscribe((data : {taskFilter: TaskFilter, tasks: Task[]}) => {
            this.filterData = data.taskFilter;
            this.tasks = this.filteredTasks = data.tasks;
        });

        this.searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this.filteredTasks = this.search(searchTerm));
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

}
