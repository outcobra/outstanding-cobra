import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
    private filterForm: FormGroup;
    private tasks: Task[];
    private filteredTasks: Task[];

    constructor(private taskService: TaskService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            searchTerm: ['']
        });
        this.taskService.getAll()
            .subscribe((tasks: Task[]) => this.tasks = this.filteredTasks = tasks);
        this.filterForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchTerm => this.filteredTasks = this.search(searchTerm));
    }

    search(term: string) {
        return this.tasks.filter((task: Task) => task.name.toLowerCase().includes(term.toLowerCase()));
    }

}
