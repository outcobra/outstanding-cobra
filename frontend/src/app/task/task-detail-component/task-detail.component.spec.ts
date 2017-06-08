/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskDetailComponent} from './task-detail.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MockTaskService} from '../../core/mock/task/mock-task.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

describe('TaskDetailComponent', () => {
    let component: TaskDetailComponent;
    let fixture: ComponentFixture<TaskDetailComponent>;

    let mockTaskService: MockTaskService = new MockTaskService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskDetailComponent
            ],
            imports: [
                TestModule,
                FormsModule,
                RouterTestingModule,
                OCUiModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: Observable.of({
                            task: MockTaskService.TASK1
                        })
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
