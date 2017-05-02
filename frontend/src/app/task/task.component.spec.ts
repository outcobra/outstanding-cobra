/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskComponent} from './task.component';
import {TestModule} from '../core/mock/test.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TaskListItemComponent} from './task-list-item/task-list-item.component';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MockTaskService} from '../core/mock/task/mock-task.service';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskComponent,
                TaskListItemComponent
            ],
            imports: [
                TestModule,
                ReactiveFormsModule,
                RouterTestingModule,
                OCUiModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: Observable.of({
                            taskFilter: {
                                schoolClassSubjects: [{
                                    schoolClass: null,
                                    subject: []
                                }]
                            },
                            tasks: [
                                MockTaskService.TASK1
                            ]
                        })
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        Promise.resolve(null).then(() => fixture.detectChanges()); // prevent 'Expression has changed after it was checked' error
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
