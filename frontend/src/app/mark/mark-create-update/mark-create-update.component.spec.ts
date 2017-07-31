import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkCreateUpdateComponent} from './mark-create-update.component';

describe('MarkCreateUpdateComponent', () => {
  let component: MarkCreateUpdateComponent;
  let fixture: ComponentFixture<MarkCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
