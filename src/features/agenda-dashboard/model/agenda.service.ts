import {
  CATEGORY_DEFINITIONS,
  DAYS,
  LEETCODE,
  STUDY_TRACK,
  THEME_BY_DAY,
  WEEKLY_HABITS,
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
  const topic = theme ? STUDY_TRACK[preferences.studyPhase][theme] : undefined;
  const habit = WEEKLY_HABITS[preferences.selectedDay];
  return rawBlocks.map((item) => {
    if (item.slot === 'leet') {
      return { ...item, title: LEETCODE.t, detail: LEETCODE.d };
    }
    if (item.slot === 'habito') {
      return habit
        ? { ...item, title: habit.t, detail: habit.d }
        : {
            ...item,
            title: 'Faculdade adiantada',
            detail: 'Adiante entrega da faculdade e a semana de prova fica muito mais leve.',
          };
    }
    if (!topic && item.slot) {
      return {
        ...item,
        title: 'Faculdade adiantada',
        detail: 'Hoje não tem tema de trilha.',
      };
    }
    if (item.slot === 'trilha') {
      return { ...item, title: topic!.t, detail: topic!.d };
    }
    if (item.slot === 'trilha2') {
      return {
        ...item,
        title: `${topic!.t} — aplicar`,
        detail:
          'A primeira parte explicou; essa aqui implementa. Abra o projeto de aprendizado e escreva o código do que você acabou de ler. Conceito que não virou código some em duas semanas.',
      };
    }
    return item;
  });
}

export function getPhaseNote(dayId: DayId, phase: AgendaPreferences['studyPhase']): string {
  if (THEME_BY_DAY[dayId]) return STUDY_TRACK[phase].note;
  if (dayId === 'sab') {
    return 'Sábado não tem bloco de trilha: a leitura longa do livro ocupa esse papel e alimenta a semana seguinte.';
  }
  return 'Domingo consolida em vez de aprender: as notas da semana viram uma página pesquisável.';
}

export function calculateCategoryTotals(blocks: ScheduleBlock[]): CategoryTotal[] {
  const visibleCategories: CategoryId[] = ['projeto', 'estudo', 'trabalho', 'treino', 'pessoal', 'descanso'];
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
