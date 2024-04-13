export function withoutNumber(value: string) {
  return !!value.match(/\d+/g);
}
