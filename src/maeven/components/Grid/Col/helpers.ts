import { ColProps } from './Col';

const sizes = ['xl', 'lg', 'md', 'sm', 'xs'];

export function hiddenToClassName(hidden: ColProps['hidden']): string {
  if (!hidden) return '';
  if (hidden === true) return 'mvn-hidden';

  if (typeof hidden === 'string') {
    return sizes
      .slice(sizes.indexOf(hidden))
      .map(size => `mvn-col-hidden-${size}`)
      .join(' ');
  }

  return hidden.map(size => `mvn-col-hidden-${size}`).join(' ');
}
