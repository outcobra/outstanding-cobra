import {ColorPipe} from './color.pipe';

describe('ColorPipe', () => {
    it('returns color with # prefix', () => {
        const pipe = new ColorPipe();
        const result = pipe.transform('12345F');
        expect(result).toBe('#12345F');
    });

    it('works with only 3 digit color', () => {
        const pipe = new ColorPipe();
        const result = pipe.transform('126');
        expect(result).toBe('#126');
    });

    it('throws error with invalid color', () => {
        const pipe = new ColorPipe();
        expect(() => pipe.transform('2F23456')).toThrowError();
    });
});
