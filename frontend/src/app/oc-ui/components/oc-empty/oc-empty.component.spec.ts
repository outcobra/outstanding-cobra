import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestModule } from '../../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui.module';

import { OCEmptyComponent } from './oc-empty.component';

describe('OCEmptyComponent', () => {
  let component: OCEmptyComponent;
  let fixture: ComponentFixture<OCEmptyComponent>;

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
    fixture = TestBed.createComponent(OCEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
