export function dashify(str: string) {
  return str
    .split('')
    .map((letter, index) => {
      if (index === 0) {
        return letter.toLowerCase();
      }
      if (letter.toLowerCase() !== letter) {
        return `-${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join('');
}
