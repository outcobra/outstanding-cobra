import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestModule } from '../../../../core/mock/test.module';

import { OCIconDataComponent } from './oc-icon-data.component';

describe('OCIconDataComponent', () => {
  let component: OCIconDataComponent;
  let fixture: ComponentFixture<OCIconDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        OCIconDataComponent
      ],
      imports: [
        TestModule,
        FlexLayoutModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCIconDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
