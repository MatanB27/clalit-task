import type { AuthTokenPayload } from '../types/auth';

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

const encodeMockToken = (payload: AuthTokenPayload): string =>
  globalThis.btoa(JSON.stringify(payload));

export const decodeMockToken = (token: string): AuthTokenPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = globalThis.atob(token);

    return JSON.parse(decoded) as AuthTokenPayload;
  } catch {
    return null;
  }
};

export const isMockTokenExpired = (token: string): boolean => {
  const payload = decodeMockToken(token);

  if (!payload) {
    return true;
  }

  return Date.now() >= payload.exp;
};

export const createMockToken = (username: string): string => {
  const now = Date.now();

  return encodeMockToken({
    sub: username,
    iat: now,
    exp: now + SESSION_DURATION_MS,
  });
};
