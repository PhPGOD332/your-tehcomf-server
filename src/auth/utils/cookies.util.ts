type RequestLike = {
  cookies?: Record<string, string | undefined>;
  headers?: {
    cookie?: string;
  };
};

export function getCookieValue(
  request: RequestLike | undefined,
  cookieName: string,
): string | null {
  if (!request) {
    return null;
  }

  const fromCookiesObject = request.cookies?.[cookieName];

  if (fromCookiesObject) {
    return fromCookiesObject;
  }

  const cookieHeader = request.headers?.cookie;

  if (!cookieHeader) {
    return null;
  }

  const cookieEntries = cookieHeader.split(';');

  for (const cookieEntry of cookieEntries) {
    const [rawName, ...rawValueParts] = cookieEntry.trim().split('=');

    if (!rawName || rawName !== cookieName) {
      continue;
    }

    const rawValue = rawValueParts.join('=');

    if (!rawValue) {
      return null;
    }

    try {
      return decodeURIComponent(rawValue);
    } catch {
      return rawValue;
    }
  }

  return null;
}
