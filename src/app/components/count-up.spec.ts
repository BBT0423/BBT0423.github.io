import { parseStat } from './count-up';

describe('parseStat', () => {
  it('splits a grouped number', () => {
    expect(parseStat('2,043')).toEqual({ prefix: '', target: 2043, suffix: '', grouped: true });
  });

  it('keeps the suffix (EN and TH)', () => {
    expect(parseStat('2+ yrs')).toEqual({ prefix: '', target: 2, suffix: '+ yrs', grouped: false });
    expect(parseStat('2+ ปี')?.suffix).toBe('+ ปี');
  });

  it('returns null when there is no number', () => {
    expect(parseStat('n/a')).toBeNull();
  });
});
