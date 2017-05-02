/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskListItemComponent} from './task-list-item.component';
import {TestModule} from '../../core/mock/test.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('TaskListItemComponent', () => {
    let component: TaskListItemComponent;
    let fixture: ComponentFixture<TaskListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskListItemComponent
            ],
            imports: [
                RouterTestingModule,
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
