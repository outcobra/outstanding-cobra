import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCIconDataComponent} from './oc-icon-data.component';

describe('OCIconDataComponent', () => {
  let component: OCIconDataComponent;
  let fixture: ComponentFixture<OCIconDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OCIconDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCIconDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
