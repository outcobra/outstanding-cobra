import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkSemesterComponent} from './mark-semester.component';

describe('MarkSemesterComponent', () => {
  let component: MarkSemesterComponent;
  let fixture: ComponentFixture<MarkSemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkSemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
