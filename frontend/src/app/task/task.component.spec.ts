/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';
import { MockTaskService } from '../core/mock/task/mock-task.service';
import { TestModule } from '../core/mock/test.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { TaskDetailComponent } from './task-detail-component/task-detail.component';
import { TaskListItemHeaderComponent } from './task-list-item-header/task-list-item-header.component';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskComponent,
        TaskListItemHeaderComponent,
        TaskDetailComponent
      ],
      imports: [
        TestModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        OCUiModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: observableOf({
              schoolClassSubject: {
                schoolClass: null,
                subject: []
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
    setTimeout(() => fixture.detectChanges()); // prevent 'Expression has changed after it was checked' error
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
