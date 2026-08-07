import {
  CATEGORY_DEFINITIONS,
  DAYS,
  DAY_ORDER,
  THEME_BY_DAY,
} from '../../../entities/agenda/data/agenda.data';
import type {
  AgendaPreferences,
  DayId,
  DemandLevel,
  ScheduleBlock,
  StudyPhase,
} from '../../../entities/agenda/model/types';
import { getRequiredElement } from '../../../shared/lib/dom';
import { escapeHtml } from '../../../shared/lib/html';
import { durationInMinutes, formatDuration, isCurrentTimeInRange } from '../../../shared/lib/time';
import { logout } from '../../auth/model/auth.service';
import {
  calculateCategoryTotals,
  getBlocksForDay,
  getPhaseNote,
} from '../model/agenda.service';
import { loadPreferences, savePreferences } from '../model/preferences.service';

interface AgendaViewOptions {
  onLogout: () => void;
}

export class AgendaView {
  private preferences: AgendaPreferences = loadPreferences();
  private clockTimer: number | undefined;

  constructor(
    private readonly root: HTMLElement,
    private readonly options: AgendaViewOptions,
  ) {}

  mount(): void {
    this.render();
    this.clockTimer = window.setInterval(() => this.render(), 60_000);
  }

  destroy(): void {
    if (this.clockTimer !== undefined) window.clearInterval(this.clockTimer);
  }

  private updatePreferences(patch: Partial<AgendaPreferences>): void {
    this.preferences = { ...this.preferences, ...patch };
    savePreferences(this.preferences);
    this.render();
  }

  private render(): void {
    const now = new Date();
    const todayId = DAY_ORDER[(now.getDay() + 6) % 7];
    const day = DAYS[this.preferences.selectedDay];
    const blocks = getBlocksForDay(this.preferences);
    const totals = calculateCategoryTotals(blocks);
    const demandDisabled = !day.hasDemand;
    const phaseDisabled = !THEME_BY_DAY[this.preferences.selectedDay];

    const dateWeekday = now
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .replace(/^./, (character) => character.toUpperCase());
    const dateLong = now.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    this.root.innerHTML = `
      <main class="app-shell ${this.preferences.density === 'compact' ? 'is-compact' : ''}">
        <header class="app-header">
          <div>
            <h1>Agenda do dia</h1>
          </div>
          <div class="header-actions">
            <div class="current-date">
              <span>${escapeHtml(dateWeekday)}</span>
              <strong>${escapeHtml(dateLong)}</strong>
            </div>
            <button class="ghost-button" data-action="logout" type="button">Sair</button>
          </div>
        </header>

        <section class="view-toolbar" aria-label="Preferências de visualização">
          <button class="toolbar-button" data-action="density" type="button" aria-pressed="${this.preferences.density === 'compact'}">
            ${this.preferences.density === 'compact' ? 'Visual confortável' : 'Visual compacto'}
          </button>
          <button class="toolbar-button" data-action="details" type="button" aria-pressed="${this.preferences.showDetails}">
            ${this.preferences.showDetails ? 'Ocultar detalhes' : 'Mostrar detalhes'}
          </button>
          <button class="toolbar-button" data-action="totals" type="button" aria-pressed="${this.preferences.showTotals}">
            ${this.preferences.showTotals ? 'Ocultar totais' : 'Mostrar totais'}
          </button>
        </section>

        <nav class="day-navigation" aria-label="Dia da semana">
          ${DAY_ORDER.map((dayId) => this.renderDayButton(dayId, todayId)).join('')}
        </nav>

        <section class="choice-card ${demandDisabled ? 'is-disabled' : ''}" aria-disabled="${demandDisabled}">
          <p class="section-label">Demanda do trabalho hoje</p>
          <div class="choice-list">
            ${this.renderDemandChoices(demandDisabled)}
          </div>
        </section>

        <section class="choice-card ${phaseDisabled ? 'is-disabled' : ''}" aria-disabled="${phaseDisabled}">
          <p class="section-label">Fase da trilha de estudo</p>
          <div class="choice-list">
            ${this.renderPhaseChoices(phaseDisabled)}
          </div>
          <p class="context-note context-note--gold">${escapeHtml(getPhaseNote(this.preferences.selectedDay, this.preferences.studyPhase))}</p>
        </section>

        ${
          this.preferences.showTotals
            ? `<section class="totals-grid" aria-label="Totais do dia">
                ${totals
                  .map(
                    (total) => `
                      <article class="total-card">
                        <div class="total-card__label">
                          <span class="category-dot" style="--category-color:${CATEGORY_DEFINITIONS[total.category].color}"></span>
                          ${escapeHtml(CATEGORY_DEFINITIONS[total.category].name)}
                        </div>
                        <strong class="total-card__value ${total.minutes ? '' : 'is-empty'}">${escapeHtml(total.formatted)}</strong>
                      </article>
                    `,
                  )
                  .join('')}
              </section>`
            : ''
        }

        <section class="schedule-card">
          <header class="schedule-header">
            <h2>${escapeHtml(day.name)}</h2>
            <span>${escapeHtml(day.meta)}</span>
          </header>
          <div class="schedule-list">
            ${blocks.map((block, index) => this.renderScheduleBlock(block, index === blocks.length - 1, now, todayId)).join('')}
          </div>
        </section>
      </main>
    `;

    this.bindEvents();
  }

  private renderDayButton(dayId: DayId, todayId: DayId): string {
    const selected = this.preferences.selectedDay === dayId;
    const today = dayId === todayId;
    return `
      <button
        class="day-button ${selected ? 'is-selected' : ''}"
        data-day="${dayId}"
        type="button"
        aria-selected="${selected}"
      >
        ${escapeHtml(DAYS[dayId].shortName)}
        <span class="today-indicator ${today ? 'is-visible' : ''}" aria-hidden="true"></span>
      </button>
    `;
  }

  private renderDemandChoices(disabled: boolean): string {
    const choices: Array<[DemandLevel, string]> = [
      ['livre', 'Livre'],
      ['medio', 'Médio'],
      ['continuo', 'Contínuo'],
    ];
    const colors: Record<DemandLevel, string> = {
      livre: 'var(--color-accent-2)',
      medio: 'var(--color-accent)',
      continuo: '#a34a2f',
    };

    return choices
      .map(([value, label]) => {
        const selected = !disabled && this.preferences.demandLevel === value;
        return `
          <button
            class="choice-button ${selected ? 'is-selected' : ''}"
            data-demand="${value}"
            type="button"
            aria-pressed="${selected}"
            ${disabled ? 'disabled' : ''}
          >
            <span class="choice-bar" style="--choice-color:${colors[value]}"></span>
            ${escapeHtml(label)}
          </button>
        `;
      })
      .join('');
  }

  private renderPhaseChoices(disabled: boolean): string {
    const choices: Array<[StudyPhase, string, string]> = [
      ['f1', 'Fundação', 'Sem. 1–8 · redes'],
      ['f2', 'Operação', 'Sem. 9–16 · devops e cloud'],
      ['f3', 'Rigor', 'Sem. 17–24 · segurança'],
    ];
    const colors: Record<StudyPhase, string> = {
      f1: 'var(--color-accent)',
      f2: 'var(--color-accent-2)',
      f3: '#97627e',
    };

    return choices
      .map(([value, label, subtitle]) => {
        const selected = this.preferences.studyPhase === value;
        return `
          <button
            class="choice-button choice-button--phase ${selected ? 'is-selected' : ''}"
            data-phase="${value}"
            type="button"
            aria-pressed="${selected}"
            ${disabled ? 'disabled' : ''}
          >
            <span class="choice-bar choice-bar--tall" style="--choice-color:${colors[value]}"></span>
            <span>${escapeHtml(label)}<small>${escapeHtml(subtitle)}</small></span>
          </button>
        `;
      })
      .join('');
  }

  private renderScheduleBlock(block: ScheduleBlock, last: boolean, now: Date, todayId: DayId): string {
    const minutes = durationInMinutes(block.start, block.end);
    const isSoft = block.category === 'descanso' || block.category === 'rotina';
    const isNow =
      this.preferences.selectedDay === todayId &&
      block.category !== 'sono' &&
      isCurrentTimeInRange(now, block.start, block.end);

    const pills: string[] = [];
    if (isNow) pills.push('<span class="pill pill--now">agora</span>');
    if (block.tag === 'opcional') pills.push('<span class="pill pill--optional">opcional</span>');
    if (block.tag === 'inegociável') pills.push('<span class="pill pill--protected">inegociável</span>');
    if (block.tag === '1ª do mês: manutenção') {
      pills.push('<span class="pill pill--optional">1ª do mês: manutenção</span>');
    }

    return `
      <article
        class="schedule-row ${last ? 'is-last' : ''} ${isSoft ? 'is-soft' : ''} ${isNow ? 'is-now' : ''}"
        style="--row-minutes:${minutes}"
      >
        <div class="schedule-time">
          <strong>${escapeHtml(block.start)}</strong>
          <span>${escapeHtml(block.end)} · ${escapeHtml(formatDuration(minutes))}</span>
        </div>
        <div class="schedule-category" style="--category-color:${CATEGORY_DEFINITIONS[block.category].color}"></div>
        <div class="schedule-content">
          <div class="schedule-title-line">
            <h3>${escapeHtml(block.title)}</h3>
            ${pills.join('')}
          </div>
          ${this.preferences.showDetails && block.detail ? `<p>${escapeHtml(block.detail)}</p>` : ''}
        </div>
      </article>
    `;
  }

  private bindEvents(): void {
    getRequiredElement<HTMLElement>('.app-shell', this.root).addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLButtonElement>('button');
      if (!button) return;

      const day = button.dataset.day as DayId | undefined;
      if (day) {
        this.updatePreferences({ selectedDay: day });
        return;
      }

      const demand = button.dataset.demand as DemandLevel | undefined;
      if (demand) {
        this.updatePreferences({ demandLevel: demand });
        return;
      }

      const phase = button.dataset.phase as StudyPhase | undefined;
      if (phase) {
        this.updatePreferences({ studyPhase: phase });
        return;
      }

      switch (button.dataset.action) {
        case 'density':
          this.updatePreferences({
            density: this.preferences.density === 'compact' ? 'comfortable' : 'compact',
          });
          break;
        case 'details':
          this.updatePreferences({ showDetails: !this.preferences.showDetails });
          break;
        case 'totals':
          this.updatePreferences({ showTotals: !this.preferences.showTotals });
          break;
        case 'logout':
          logout();
          this.destroy();
          this.options.onLogout();
          break;
      }
    });
  }
}
