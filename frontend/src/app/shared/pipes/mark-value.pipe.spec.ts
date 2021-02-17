import { DecimalPipe } from '@angular/common';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { PipeModule } from '../pipe.module';
import { MarkValuePipe } from './mark-value.pipe';

describe('MarkValuePipe', () => {

  beforeEach(waitForAsync(() => {
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
