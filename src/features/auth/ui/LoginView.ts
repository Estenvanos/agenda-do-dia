import { APP_CONFIG } from '../../../app/config';
import { getRequiredElement } from '../../../shared/lib/dom';
import { escapeHtml } from '../../../shared/lib/html';
import { login } from '../model/auth.service';

interface LoginViewOptions {
  onAuthenticated: () => void;
}

export class LoginView {
  constructor(
    private readonly root: HTMLElement,
    private readonly options: LoginViewOptions,
  ) {}

  mount(): void {
    this.root.innerHTML = `
      <main class="login-page">
        <section class="login-card" aria-labelledby="login-title">
          <h1 id="login-title">${escapeHtml(APP_CONFIG.name)}</h1>
          <p class="login-description">Entre para acessar sua rotina semanal e as fases da trilha de estudos.</p>

          <form class="login-form" novalidate>
            <label class="field">
              <span>Usuário</span>
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                autocapitalize="none"
                spellcheck="false"
                required
                placeholder="Digite seu usuário"
              />
            </label>

            <label class="field">
              <span>Senha</span>
              <div class="password-field">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  placeholder="Digite sua senha"
                />
                <button class="password-toggle" type="button" aria-label="Mostrar senha">Mostrar</button>
              </div>
            </label>

            <p class="form-error" role="alert" aria-live="polite"></p>
            <button class="primary-button" type="submit">Entrar</button>
          </form>

          <p class="login-note">Este acesso é local e foi criado para uso pessoal.</p>
        </section>
      </main>
    `;

    const form = getRequiredElement<HTMLFormElement>('.login-form', this.root);
    const usernameInput = getRequiredElement<HTMLInputElement>('#username', form);
    const passwordInput = getRequiredElement<HTMLInputElement>('#password', form);
    const error = getRequiredElement<HTMLElement>('.form-error', form);
    const toggle = getRequiredElement<HTMLButtonElement>('.password-toggle', form);

    usernameInput.focus();

    toggle.addEventListener('click', () => {
      const showing = passwordInput.type === 'text';
      passwordInput.type = showing ? 'password' : 'text';
      toggle.textContent = showing ? 'Mostrar' : 'Ocultar';
      toggle.setAttribute('aria-label', showing ? 'Mostrar senha' : 'Ocultar senha');
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      error.textContent = '';

      const result = login(usernameInput.value, passwordInput.value);
      if (!result.success) {
        error.textContent = result.message ?? 'Não foi possível entrar.';
        passwordInput.select();
        return;
      }

      this.options.onAuthenticated();
    });
  }
}
