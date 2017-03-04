/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskCreateUpdateDialog} from './task-create-update-dialog.component';

describe('TaskCreateUpdateDialog', () => {
  let component: TaskCreateUpdateDialog;
  let fixture: ComponentFixture<TaskCreateUpdateDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCreateUpdateDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateUpdateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
