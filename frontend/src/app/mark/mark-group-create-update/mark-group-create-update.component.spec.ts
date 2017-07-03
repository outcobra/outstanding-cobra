import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkGroupCreateUpdateComponent} from './mark-group-create-update.component';

describe('MarkGroupCreateUpdateComponent', () => {
  let component: MarkGroupCreateUpdateComponent;
  let fixture: ComponentFixture<MarkGroupCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkGroupCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkGroupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
