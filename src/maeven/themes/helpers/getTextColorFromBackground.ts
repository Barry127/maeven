import { color } from 'csx';

export function getTextColorFromBackground(
  background: string,
  lightColor: string,
  darkColor: string
) {
  const c = color(background);
  return c.red() * 0.299 + c.green() * 0.587 + c.blue() * 0.144 > 186
    ? darkColor
    : lightColor;
}
