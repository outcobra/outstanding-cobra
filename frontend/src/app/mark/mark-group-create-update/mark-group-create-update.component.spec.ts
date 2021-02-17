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

import { MarkGroupCreateUpdateComponent } from './mark-group-create-update.component';

describe('MarkGroupCreateUpdateComponent', () => {
  let component: MarkGroupCreateUpdateComponent;
  let fixture: ComponentFixture<MarkGroupCreateUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MarkGroupCreateUpdateComponent,
        MarkValueComponent,
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
              subjectMarkGroup: MockMarkService.SUBJECT_MARK_GROUP_1,
              isEdit: false
            }),
            paramMap: observableOf(convertToParamMap({
              semesterId: MockMarkService.SEMESTER_MARK_1.id
            }))
          }
        }
      ]
    }).compileComponents();
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
