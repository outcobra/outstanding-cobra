import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';
import { MockMarkService } from '../../core/mock/mark/mock-mark.service';
import { TestModule } from '../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui/oc-ui.module';
import { MarkHighlighterDirective } from '../mark-highlighter/mark-highlighter.directive';
import { MarkValueComponent } from '../mark-value/mark-value.component';
import { MarkWeightUpdaterComponent } from '../mark-weight-updater/mark-weight-updater.component';

import { MarkSemesterComponent } from './mark-semester.component';

describe('MarkSemesterComponent', () => {
  let component: MarkSemesterComponent;
  let fixture: ComponentFixture<MarkSemesterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MarkSemesterComponent,
        MarkValueComponent,
        MarkWeightUpdaterComponent,
        MarkHighlighterDirective
      ],
      imports: [
        TestModule,
        OCUiModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: observableOf({
              semesterMark: MockMarkService.SEMESTER_MARK_1
            }),
            queryParamMap: observableOf(convertToParamMap({}))
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
