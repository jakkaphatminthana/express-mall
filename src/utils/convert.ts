export function toBoolean(
  value: string | undefined | null | boolean,
): boolean | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;

  return undefined;
}
