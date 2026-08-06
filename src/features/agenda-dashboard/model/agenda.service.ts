import {
  CATEGORY_DEFINITIONS,
  DAYS,
  DEMAND_NOTES,
  STUDY_TRACK,
  THEME_BY_DAY,
} from '../../../entities/agenda/data/agenda.data';
import type {
  AgendaPreferences,
  CategoryId,
  CategoryTotal,
  DayId,
  ScheduleBlock,
} from '../../../entities/agenda/model/types';
import { durationInMinutes, formatDuration } from '../../../shared/lib/time';

export function getBlocksForDay(preferences: AgendaPreferences): ScheduleBlock[] {
  const day = DAYS[preferences.selectedDay];
  const rawBlocks = day.hasDemand
    ? [
        ...(day.morning ?? []),
        ...(day.getWorkBlocks?.(preferences.demandLevel) ?? []),
        ...(day.evening ?? []),
      ]
    : [...(day.blocks ?? [])];

  const theme = THEME_BY_DAY[preferences.selectedDay];
  if (!theme) {
    return rawBlocks.map((item) =>
      item.slot
        ? {
            ...item,
            title: 'Faculdade adiantada ou curso',
            detail:
              'Hoje o horário anterior é de carreira, então esse bloco é da faculdade. Adiante entrega agora e a semana de prova fica muito mais leve.',
          }
        : item,
    );
  }

  const topic = STUDY_TRACK[preferences.studyPhase][theme];
  return rawBlocks.map((item) => {
    if (item.slot === 'trilha') {
      return { ...item, title: topic.t, detail: topic.d };
    }
    if (item.slot === 'trilha2') {
      return {
        ...item,
        title: `${topic.t} — segundo bloco`,
        detail:
          'Aplique no código do ResuMax, agora, o que você viu no bloco anterior. Uma hora de leitura que não vira commit evapora em duas semanas. Se a faculdade estiver atrasada, ela ganha esse bloco no lugar.',
      };
    }
    return item;
  });
}

export function getDemandNote(preferences: AgendaPreferences): string {
  const day = DAYS[preferences.selectedDay];
  return day.hasDemand ? DEMAND_NOTES[preferences.demandLevel] : day.note ?? '';
}

export function getPhaseNote(dayId: DayId, phase: AgendaPreferences['studyPhase']): string {
  if (THEME_BY_DAY[dayId]) return STUDY_TRACK[phase].note;
  if (dayId === 'qui') {
    return 'Quinta não tem bloco de trilha: o horário das 15:10 é de carreira. A trilha volta na sexta.';
  }
  if (dayId === 'sab') {
    return 'Sábado não tem bloco de trilha: o expediente inteiro é projeto. A trilha volta na segunda.';
  }
  return 'Domingo é folga da trilha e do projeto.';
}

export function calculateCategoryTotals(blocks: ScheduleBlock[]): CategoryTotal[] {
  const visibleCategories: CategoryId[] = ['saas', 'estudo', 'trabalho', 'treino', 'pessoal', 'descanso'];
  const totals = new Map<CategoryId, number>();

  for (const item of blocks) {
    if (item.category === 'sono') continue;
    totals.set(item.category, (totals.get(item.category) ?? 0) + durationInMinutes(item.start, item.end));
  }

  return visibleCategories.map((category) => {
    const minutes = totals.get(category) ?? 0;
    return {
      category,
      minutes,
      formatted: minutes ? formatDuration(minutes) : '—',
    };
  });
}

export function getCategoryCssColor(category: CategoryId): string {
  return CATEGORY_DEFINITIONS[category].color;
}
