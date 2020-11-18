import { dashify } from '../dashify';

export const componentTemplate = (name: string) =>
  `import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import classes from './${dashify(name)}.module.scss';

/**
 * ${name} description
 */
export const ${name} = forwardRef<
  HTMLDivElement,
  ${name}Props
>(({ children, className, ...props }, ref) => (
  <div {...props} className={clsx('mvn--${dashify(name)}', ${
    dashify(name).includes('-')
      ? "classes['" + dashify(name) + "']"
      : 'classes.' + dashify(name)
  }, className)} ref={ref}>
    {children}
  </div>
));

export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {

}
`;

export const indexTemplate = (name: string) =>
  `export { ${name}} from './${name}';
export type { ${name}Props } from './${name}';
`;

export const mdxTemplate = (name: string) =>
  `import { Description, Meta, Props } from 'docsComponents';

<Meta title="${name}" />

# ${name}

<Description of="${name}" />

## Props

<Props of="${name}" />
`;

export const specTemplate = (name: string) =>
  `import { render } from '@testing-library/react'
import React, { createRef } from 'react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders div element with given text', () => {
    render(<${name}>Hello world!</${name}>);
    const element = document.querySelector('.mvn--${dashify(name)}');
    expect(element?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(
      <${name} className="${dashify(name)}-class">Hello world!</${name}>
    );
    const element = document.querySelector('.mvn--${dashify(name)}')
    expect(element).toHaveClass('${dashify(name)}-class');
  });

  it('passes props', () => {
    render(
      <${name} id="${name}Id" data-test="${dashify(name)}-data">
        Hello world!
      </${name}>
    );
    const element = document.querySelector('.mvn--${dashify(name)}')
    expect(element).toHaveAttribute('id', '${name}Id');
    expect(element).toHaveAttribute('data-test', '${dashify(name)}-data');
  });

  it.skip('', () => {});

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<${name} ref={ref} />);
      const element = document.querySelector('.mvn--${dashify(name)}');
      expect(ref.current).toBe(element);
    })
  });
})
`;

export const stylesTemplate = (name: string) =>
  `.${dashify(name)} {
  color: red;
}
`;
