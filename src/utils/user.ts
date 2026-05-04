export function isValidDisplayName(displayName: string): boolean {
  if (typeof displayName !== 'string') return false;
  const trimmed = displayName.trim();
  if (trimmed.length < 2) return false;
  if (trimmed.length > 20) return false;
  return true;
}

export function isValidFirstName(firstName: string): boolean {
  if (typeof firstName !== 'string') return false;
  const trimmed = firstName.trim();
  if (trimmed.length < 1) return false;
  if (trimmed.length > 20) return false;
  return true;
}

export function isValidLastName(lastName: string): boolean {
  if (typeof lastName !== 'string') return false;
  const trimmed = lastName.trim();
  if (trimmed.length < 1) return false;
  if (trimmed.length > 20) return false;
  return true;
}
