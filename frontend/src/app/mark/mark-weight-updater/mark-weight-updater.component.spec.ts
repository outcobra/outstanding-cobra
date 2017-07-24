import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkWeightUpdaterComponent} from './mark-weight-updater.component';

describe('MarkWeightUpdaterComponent', () => {
  let component: MarkWeightUpdaterComponent;
  let fixture: ComponentFixture<MarkWeightUpdaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkWeightUpdaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkWeightUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
