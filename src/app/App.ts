import { AgendaView } from '../features/agenda-dashboard/ui/AgendaView';
import { isAuthenticated } from '../features/auth/model/auth.service';
import { LoginView } from '../features/auth/ui/LoginView';

export class App {
  private agendaView: AgendaView | null = null;

  constructor(private readonly root: HTMLElement) {}

  start(): void {
    this.renderCurrentRoute();
  }

  private renderCurrentRoute(): void {
    this.agendaView?.destroy();
    this.agendaView = null;

    if (isAuthenticated()) {
      this.agendaView = new AgendaView(this.root, {
        onLogout: () => this.renderCurrentRoute(),
      });
      this.agendaView.mount();
      return;
    }

    new LoginView(this.root, {
      onAuthenticated: () => this.renderCurrentRoute(),
    }).mount();
  }
}
