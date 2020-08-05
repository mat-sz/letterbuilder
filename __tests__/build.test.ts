import { build } from '../src';

describe('build', () => {
  it('outputs current date if no date is provided', () => {
    const expectedDate = new Date().toUTCString();

    expect(
      build({
        html: 'test',
      })
    ).toContain('Date: ' + expectedDate);
  });

  it('converts date formats correctly', () => {
    expect(
      build({
        date: new Date(Date.UTC(2020, 1, 1)),
        html: 'test',
      })
    ).toContain('Date: Sat, 01 Feb 2020 00:00:00 GMT');
  });

  it('throws when no content is present', () => {
    expect(() => build({})).toThrowError('Content is required.');
  });
});
