import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { H1, H2, H3, H4, H5, H6, P, Ul, Ol, Li, A } from './Html';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

afterEach(reinit);

describe('H1', () => {
  it('renders a h1 element with given text', () => {
    render(<H1>H1 Text Content</H1>);
    const element = document.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H1 Text Content');
  });

  it('sets className', () => {
    render(<H1 className="My-h1-class">H1 Text Content</H1>);
    const element = document.querySelector('h1');
    expect(element!.classList).toContain('My-h1-class');
  });

  it('passes props', () => {
    render(
      <H1 id="h1" data-test="test-attr">
        H1 Text Content
      </H1>
    );
    const element = document.querySelector('h1');
    expect(element!.id).toBe('h1');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        H1: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <H1>Hello World</H1>
      </ThemeProvider>
    );

    const element = document.querySelector('h1');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('H2', () => {
  it('renders a h2 element with given text', () => {
    render(<H2>H2 Text Content</H2>);
    const element = document.querySelector('h2');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H2 Text Content');
  });

  it('sets className', () => {
    render(<H2 className="My-h2-class">H2 Text Content</H2>);
    const element = document.querySelector('h2');
    expect(element!.classList).toContain('My-h2-class');
  });

  it('passes props', () => {
    render(
      <H2 id="h2" data-test="test-attr">
        H2 Text Content
      </H2>
    );
    const element = document.querySelector('h2');
    expect(element!.id).toBe('h2');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        H2: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <H2>Hello World</H2>
      </ThemeProvider>
    );

    const element = document.querySelector('h2');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('H3', () => {
  it('renders a h3 element with given text', () => {
    render(<H3>H3 Text Content</H3>);
    const element = document.querySelector('h3');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H3 Text Content');
  });

  it('sets className', () => {
    render(<H3 className="My-h3-class">H3 Text Content</H3>);
    const element = document.querySelector('h3');
    expect(element!.classList).toContain('My-h3-class');
  });

  it('passes props', () => {
    render(
      <H3 id="h3" data-test="test-attr">
        H3 Text Content
      </H3>
    );
    const element = document.querySelector('h3');
    expect(element!.id).toBe('h3');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        H3: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <H3>Hello World</H3>
      </ThemeProvider>
    );

    const element = document.querySelector('h3');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('H4', () => {
  it('renders a h4 element with given text', () => {
    render(<H4>H4 Text Content</H4>);
    const element = document.querySelector('h4');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H4 Text Content');
  });

  it('sets className', () => {
    render(<H4 className="My-h4-class">H4 Text Content</H4>);
    const element = document.querySelector('h4');
    expect(element!.classList).toContain('My-h4-class');
  });

  it('passes props', () => {
    render(
      <H4 id="h4" data-test="test-attr">
        H4 Text Content
      </H4>
    );
    const element = document.querySelector('h4');
    expect(element!.id).toBe('h4');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        H4: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <H4>Hello World</H4>
      </ThemeProvider>
    );

    const element = document.querySelector('h4');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('H5', () => {
  it('renders a h5 element with given text', () => {
    render(<H5>H5 Text Content</H5>);
    const element = document.querySelector('h5');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H5 Text Content');
  });

  it('sets className', () => {
    render(<H5 className="My-h5-class">H5 Text Content</H5>);
    const element = document.querySelector('h5');
    expect(element!.classList).toContain('My-h5-class');
  });

  it('passes props', () => {
    render(
      <H5 id="h5" data-test="test-attr">
        H5 Text Content
      </H5>
    );
    const element = document.querySelector('h5');
    expect(element!.id).toBe('h5');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        H5: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <H5>Hello World</H5>
      </ThemeProvider>
    );

    const element = document.querySelector('h5');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('H6', () => {
  it('renders a h6 element with given text', () => {
    render(<H6>H6 Text Content</H6>);
    const element = document.querySelector('h6');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('H6 Text Content');
  });

  it('sets className', () => {
    render(<H6 className="My-h6-class">H6 Text Content</H6>);
    const element = document.querySelector('h6');
    expect(element!.classList).toContain('My-h6-class');
  });

  it('passes props', () => {
    render(
      <H6 id="h6" data-test="test-attr">
        H6 Text Content
      </H6>
    );
    const element = document.querySelector('h6');
    expect(element!.id).toBe('h6');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        H6: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <H6>Hello World</H6>
      </ThemeProvider>
    );

    const element = document.querySelector('h6');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('P', () => {
  it('renders a p element with given text', () => {
    render(<P>P Text Content</P>);
    const element = document.querySelector('p');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('P Text Content');
  });

  it('sets className', () => {
    render(<P className="My-p-class">P Text Content</P>);
    const element = document.querySelector('p');
    expect(element!.classList).toContain('My-p-class');
  });

  it('passes props', () => {
    render(
      <P id="p" data-test="test-attr">
        P Text Content
      </P>
    );
    const element = document.querySelector('p');
    expect(element!.id).toBe('p');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        P: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <P>Hello World</P>
      </ThemeProvider>
    );

    const element = document.querySelector('p');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('Ul', () => {
  it('renders an ul element with given text', () => {
    render(<Ul>Ul Text Content</Ul>);
    const element = document.querySelector('ul');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('Ul Text Content');
  });

  it('sets className', () => {
    render(<Ul className="My-ul-class">Ul Text Content</Ul>);
    const element = document.querySelector('ul');
    expect(element!.classList).toContain('My-ul-class');
  });

  it('passes props', () => {
    render(
      <Ul id="ul" data-test="test-attr">
        Ul Text Content
      </Ul>
    );
    const element = document.querySelector('ul');
    expect(element!.id).toBe('ul');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Ul: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Ul>Hello World</Ul>
      </ThemeProvider>
    );

    const element = document.querySelector('ul');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('Ol', () => {
  it('renders an ol element with given text', () => {
    render(<Ol>Ol Text Content</Ol>);
    const element = document.querySelector('ol');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('Ol Text Content');
  });

  it('sets className', () => {
    render(<Ol className="My-ol-class">Ol Text Content</Ol>);
    const element = document.querySelector('ol');
    expect(element!.classList).toContain('My-ol-class');
  });

  it('passes props', () => {
    render(
      <Ol id="ol" data-test="test-attr">
        Ol Text Content
      </Ol>
    );
    const element = document.querySelector('ol');
    expect(element!.id).toBe('ol');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Ol: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Ol>Hello World</Ol>
      </ThemeProvider>
    );

    const element = document.querySelector('ol');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('Li', () => {
  it('renders a li element with given text', () => {
    render(<Li>Li Text Content</Li>);
    const element = document.querySelector('li');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('Li Text Content');
  });

  it('sets className', () => {
    render(<Li className="My-li-class">Li Text Content</Li>);
    const element = document.querySelector('li');
    expect(element!.classList).toContain('My-li-class');
  });

  it('passes props', () => {
    render(
      <Li id="li" data-test="test-attr">
        Li Text Content
      </Li>
    );
    const element = document.querySelector('li');
    expect(element!.id).toBe('li');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        Li: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Li>Hello World</Li>
      </ThemeProvider>
    );

    const element = document.querySelector('li');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});

describe('A', () => {
  it('renders an a element with given text', () => {
    render(<A>A Text Content</A>);
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
    expect(element!.textContent).toBe('A Text Content');
  });

  it('sets className', () => {
    render(<A className="My-a-class">A Text Content</A>);
    const element = document.querySelector('a');
    expect(element!.classList).toContain('My-a-class');
  });

  it('passes props', () => {
    render(
      <A id="a" data-test="test-attr">
        A Text Content
      </A>
    );
    const element = document.querySelector('a');
    expect(element!.id).toBe('a');
    expect(element!.dataset.test).toBe('test-attr');
  });

  it('Styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        A: {
          color: 'yellow'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <A>Hello World</A>
      </ThemeProvider>
    );

    const element = document.querySelector('a');
    const styles = getStylesForElement(element!);
    expect(styles.color).toBe('yellow');
  });
});
