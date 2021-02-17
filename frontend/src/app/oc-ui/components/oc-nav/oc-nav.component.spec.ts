import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TestModule } from '../../../core/mock/test.module';
import { OCUiModule } from '../../oc-ui.module';

import { OCNavComponent } from './oc-nav.component';

describe('OCNavComponent', () => {
  let component: OCNavComponent;
  let fixture: ComponentFixture<OCNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OCUiModule,
        TestModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OCNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toggler', () => {
    component.collapsible = true;
    fixture.detectChanges();

    let collapserContainer = fixture.debugElement.query(By.css('.oc-nav-collapser'));
    expect(collapserContainer).toBeTruthy();
  });

  it('should toggle', () => {
    component.collapsible = true;
    fixture.detectChanges();

    let isCollapsed = component.collapsed;

    let collapser = fixture.debugElement.query(By.css('.oc-nav-collapser')).query(By.directive(MatButton));
    collapser.nativeElement.click();
    expect(component.collapsed).toBe(!isCollapsed);
  });
});
