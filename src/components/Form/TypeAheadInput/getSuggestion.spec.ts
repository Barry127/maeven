import { getSuggestion } from './getSuggestion';

describe('getSuggestion', () => {
  it('returns first suggestion', () => {
    const items = ['red', 'blue', 'yellow', 'orange', 'green', 'grey'];
    expect(getSuggestion('gre', items)).toBe('green');
  });

  it('returns first suggestion in alphabetical order', () => {
    const items = ['aa3', 'aa2', 'aa1'];
    expect(getSuggestion('aa', items)).toBe('aa1');
  });

  it('returns undefined when no suggestion is found', () => {
    const items = ['aa', 'bb', 'cc'];
    expect(getSuggestion('d', items)).toBeUndefined();
  });

  it('is case insensitive', () => {
    const items = ['YeLLoW', 'GREEN'];
    expect(getSuggestion('yEl', items)).toBe('YeLLoW');
  });
});
