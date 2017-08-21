import {MarkValuePipe} from './mark-value.pipe';
import {async, inject, TestBed} from '@angular/core/testing';
import {DecimalPipe} from '@angular/common';
import {PipeModule} from '../pipe.module';

describe('MarkValuePipe', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PipeModule
            ]
        }).compileComponents();
    }));


    it('create an instance', inject([DecimalPipe], (decimalPipe: DecimalPipe) => {
        const pipe = new MarkValuePipe(decimalPipe);
        expect(pipe).toBeTruthy();
    }));
});
