/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SubjectDialog} from "./subject-dialog.component";

describe('SubjectDialog', () => {
    let component: SubjectDialog;
    let fixture: ComponentFixture<SubjectDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubjectDialog]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubjectDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
