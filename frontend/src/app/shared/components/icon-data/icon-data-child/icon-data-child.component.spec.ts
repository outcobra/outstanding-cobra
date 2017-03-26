import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IconDataChildComponent} from './icon-data-child.component';

describe('IconDataChildComponent', () => {
  let component: IconDataChildComponent;
  let fixture: ComponentFixture<IconDataChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconDataChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDataChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
