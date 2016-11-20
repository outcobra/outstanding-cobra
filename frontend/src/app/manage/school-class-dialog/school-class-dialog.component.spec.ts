/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SchoolClassDialog} from "./school-class-dialog.component";

describe('SchoolClassDialog', () => {
    let component: SchoolClassDialog;
    let fixture: ComponentFixture<SchoolClassDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SchoolClassDialog]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchoolClassDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
