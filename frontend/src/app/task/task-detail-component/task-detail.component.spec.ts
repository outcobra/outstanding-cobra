/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTaskService } from '../../core/mock/task/mock-task.service';
import { TestModule } from '../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui/oc-ui.module';
import { TaskDetailComponent } from './task-detail.component';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  let mockTaskService: MockTaskService = new MockTaskService();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskDetailComponent
      ],
      imports: [
        TestModule,
        FormsModule,
        RouterTestingModule,
        OCUiModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    component.task = MockTaskService.TASK1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
