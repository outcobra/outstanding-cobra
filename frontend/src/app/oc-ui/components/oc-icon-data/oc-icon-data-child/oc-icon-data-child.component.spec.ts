import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCIconDataChildComponent} from './oc-icon-data-child.component';

describe('OCIconDataChildComponent', () => {
  let component: OCIconDataChildComponent;
  let fixture: ComponentFixture<OCIconDataChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OCIconDataChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCIconDataChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
