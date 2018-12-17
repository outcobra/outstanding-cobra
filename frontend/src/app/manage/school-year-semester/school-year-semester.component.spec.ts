import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SchoolYearSemesterComponent} from './school-year-semester.component';

describe('SchoolYearSemesterComponent', () => {
    let component: SchoolYearSemesterComponent;
    let fixture: ComponentFixture<SchoolYearSemesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchoolYearSemesterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchoolYearSemesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
