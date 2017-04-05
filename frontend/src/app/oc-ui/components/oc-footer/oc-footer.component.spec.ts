import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCFooterComponent} from './oc-footer.component';

describe('OCFooterComponent', () => {
  let component: OCFooterComponent;
  let fixture: ComponentFixture<OCFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OCFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
