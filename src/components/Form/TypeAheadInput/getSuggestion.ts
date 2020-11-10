export function getSuggestion(
  value: string,
  items: string[]
): string | undefined {
  const _value = value.toLocaleLowerCase();

  return items
    .filter((item) => item.toLocaleLowerCase().startsWith(_value))
    .sort()[0];
}
