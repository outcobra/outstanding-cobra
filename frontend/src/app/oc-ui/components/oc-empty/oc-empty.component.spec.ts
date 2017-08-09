import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcEmptyComponent } from './oc-empty.component';

describe('OcEmptyComponent', () => {
  let component: OcEmptyComponent;
  let fixture: ComponentFixture<OcEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
