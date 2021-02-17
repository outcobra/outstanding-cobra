import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockMarkService } from '../../core/mock/mark/mock-mark.service';
import { TestModule } from '../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui/oc-ui.module';
import { MarkHighlighterDirective } from '../mark-highlighter/mark-highlighter.directive';

import { MarkValueComponent } from './mark-value.component';

describe('MarkValueComponent', () => {
  let component: MarkValueComponent;
  let fixture: ComponentFixture<MarkValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MarkValueComponent,
        MarkHighlighterDirective
      ],
      imports: [
        TestModule,
        OCUiModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkValueComponent);
    component = fixture.componentInstance;
    component.mark = MockMarkService.SUBJECT_MARK_GROUP_1.markValues[0];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
