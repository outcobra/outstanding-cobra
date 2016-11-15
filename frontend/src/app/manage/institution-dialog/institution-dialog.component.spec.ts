/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InstitutionDialog } from './institution-dialog.component';

describe('InstitutionDialog', () => {
  let component: InstitutionDialog;
  let fixture: ComponentFixture<InstitutionDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
