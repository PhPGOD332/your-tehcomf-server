export function resolveAbsoluteMediaUrl(
  source: string,
  apiUrl?: string,
): string {
  if (!source) {
    return source;
  }

  if (/^https?:\/\//i.test(source)) {
    return source;
  }

  if (!apiUrl) {
    return source;
  }

  const normalizedApiUrl = apiUrl.replace(/\/+$/, '');
  const normalizedSource = source.startsWith('/') ? source : `/${source}`;

  return `${normalizedApiUrl}${normalizedSource}`;
}
