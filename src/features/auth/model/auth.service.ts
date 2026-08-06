import { APP_CONFIG } from '../../../app/config';

export interface LoginResult {
  success: boolean;
  message?: string;
}

export function login(username: string, password: string): LoginResult {
  const normalizedUsername = username.trim().toLowerCase();
  const isValid =
    normalizedUsername === APP_CONFIG.auth.username &&
    password === APP_CONFIG.auth.password;

  if (!isValid) {
    return { success: false, message: 'Usuário ou senha incorretos.' };
  }

  localStorage.setItem(APP_CONFIG.auth.sessionKey, 'true');
  return { success: true };
}

export function logout(): void {
  localStorage.removeItem(APP_CONFIG.auth.sessionKey);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(APP_CONFIG.auth.sessionKey) === 'true';
}
