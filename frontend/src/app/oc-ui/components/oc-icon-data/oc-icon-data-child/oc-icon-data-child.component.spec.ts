import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OCIconDataChildComponent } from './oc-icon-data-child.component';

describe('OCIconDataChildComponent', () => {
  let component: OCIconDataChildComponent;
  let fixture: ComponentFixture<OCIconDataChildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OCIconDataChildComponent]
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
