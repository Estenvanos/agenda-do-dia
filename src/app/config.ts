const authUsername = import.meta.env.VITE_AUTH_USERNAME?.trim().toLowerCase();
const authPassword = import.meta.env.VITE_AUTH_PASSWORD;

if (!authUsername || !authPassword) {
  throw new Error(
    'Credenciais ausentes. Defina VITE_AUTH_USERNAME e VITE_AUTH_PASSWORD em .env.local.',
  );
}

export const APP_CONFIG = {
  name: 'Minha Agenda',
  auth: {
    username: authUsername,
    password: authPassword,
    sessionKey: 'agenda.authenticated',
  },
  preferencesKey: 'agenda.preferences.v1',
} as const;
