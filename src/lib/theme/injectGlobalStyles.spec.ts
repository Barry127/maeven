import './injectGlobalStyles';

describe('lib/theme/injectGlobalStyles', () => {
  const links = document.querySelectorAll('head link');
  it('adds 2 link tags to head', () => {
    expect(links).toHaveLength(2);
  });

  it('adds modern normalize', () => {
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('modern-normalize')
    );
  });

  it('adds base style for maeven', () => {
    expect(links[1]).toHaveAttribute(
      'href',
      expect.stringContaining('--mvn-base')
    );
  });
});
