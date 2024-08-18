type GenerableData = { id?: string; created_at?: number }

export function withGeneratedID<T extends GenerableData>(
  value: T,
): T & GenerableData {
  return {
    ...value,
    id: crypto.randomUUID(),
    created_at: Date.now(),
  }
}
