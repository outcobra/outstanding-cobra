import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListItemHeaderComponent} from './task-list-item-header.component';

describe('TaskListItemHeaderComponent', () => {
  let component: TaskListItemHeaderComponent;
  let fixture: ComponentFixture<TaskListItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListItemHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
