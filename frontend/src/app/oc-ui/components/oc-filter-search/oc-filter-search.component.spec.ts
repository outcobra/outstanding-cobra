import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestModule } from '../../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui.module';

import { OCFilterSearchComponent } from './oc-filter-search.component';

describe('OCFilterSearchComponent', () => {
  let component: OCFilterSearchComponent;
  let fixture: ComponentFixture<OCFilterSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        OCUiModule
      ]
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
