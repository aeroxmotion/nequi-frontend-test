export function withGeneratedID<T extends { id?: string }>(
  value: T,
): T & { id: string } {
  return {
    ...value,
    id: crypto.randomUUID(),
  }
}
