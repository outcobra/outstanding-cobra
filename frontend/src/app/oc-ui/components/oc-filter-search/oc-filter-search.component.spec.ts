import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OCFilterSearchComponent } from './oc-filter-search.component';

describe('OCFilterSearchComponent', () => {
  let component: OCFilterSearchComponent;
  let fixture: ComponentFixture<OCFilterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OCFilterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCFilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
