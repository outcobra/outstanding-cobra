/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestModule } from '../../../core/mock/test.module';
import { OCEntityMenuComponent } from './oc-entity-menu.component';

describe('EntityMenuComponent', () => {
  let component: OCEntityMenuComponent;
  let fixture: ComponentFixture<OCEntityMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        OCEntityMenuComponent
      ],
      imports: [
        TestModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCEntityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
