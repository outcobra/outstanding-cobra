/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SchoolYearDialog } from './school-year-dialog.component';

describe('SchoolYearDialogComponent', () => {
  let component: SchoolYearDialog;
  let fixture: ComponentFixture<SchoolYearDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
