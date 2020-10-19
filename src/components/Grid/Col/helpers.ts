import { ColProps } from './Col';
import classes from './col.module.scss';

const sizes = ['xl', 'lg', 'md', 'sm', 'xs'];
export function hiddenToClassName(hidden: ColProps['hidden']): string {
  if (!hidden) return '';
  if (hidden === true) return classes.hidden;

  if (typeof hidden === 'string') {
    return sizes
      .slice(sizes.indexOf(hidden))
      .map((size) => classes[`hidden-${size}`])
      .join(' ');
  }

  return hidden.map((size) => classes[`hidden-${size}`]).join(' ');
}
