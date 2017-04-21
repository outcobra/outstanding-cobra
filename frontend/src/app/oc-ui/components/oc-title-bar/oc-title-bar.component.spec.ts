import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OCTitleBarComponent } from './oc-title-bar.component';

describe('OCTitleBarComponent', () => {
  let component: OCTitleBarComponent;
  let fixture: ComponentFixture<OCTitleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OCTitleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
