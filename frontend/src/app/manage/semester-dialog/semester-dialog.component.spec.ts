/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SemesterDialog} from './semester-dialog.component';

describe('SemesterDialog', () => {
    let component: SemesterDialog;
    let fixture: ComponentFixture<SemesterDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SemesterDialog]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SemesterDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
