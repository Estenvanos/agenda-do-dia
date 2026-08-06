import { APP_CONFIG } from '../../../app/config';
import { DAY_ORDER } from '../../../entities/agenda/data/agenda.data';
import type { AgendaPreferences, DayId, DemandLevel, StudyPhase } from '../../../entities/agenda/model/types';

function getTodayId(): DayId {
  const mondayBasedIndex = (new Date().getDay() + 6) % 7;
  return DAY_ORDER[mondayBasedIndex];
}

const DEFAULT_PREFERENCES: AgendaPreferences = {
  selectedDay: getTodayId(),
  demandLevel: 'medio',
  studyPhase: 'f1',
  density: 'comfortable',
  showDetails: true,
  showTotals: true,
};

const isDayId = (value: unknown): value is DayId => DAY_ORDER.includes(value as DayId);
const isDemandLevel = (value: unknown): value is DemandLevel => ['livre', 'medio', 'continuo'].includes(String(value));
const isStudyPhase = (value: unknown): value is StudyPhase => ['f1', 'f2', 'f3'].includes(String(value));

export function loadPreferences(): AgendaPreferences {
  try {
    const raw = localStorage.getItem(APP_CONFIG.preferencesKey);
    if (!raw) return { ...DEFAULT_PREFERENCES };

    const parsed = JSON.parse(raw) as Partial<AgendaPreferences>;
    return {
      selectedDay: isDayId(parsed.selectedDay) ? parsed.selectedDay : DEFAULT_PREFERENCES.selectedDay,
      demandLevel: isDemandLevel(parsed.demandLevel) ? parsed.demandLevel : DEFAULT_PREFERENCES.demandLevel,
      studyPhase: isStudyPhase(parsed.studyPhase) ? parsed.studyPhase : DEFAULT_PREFERENCES.studyPhase,
      density: parsed.density === 'compact' ? 'compact' : 'comfortable',
      showDetails: parsed.showDetails !== false,
      showTotals: parsed.showTotals !== false,
    };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(preferences: AgendaPreferences): void {
  localStorage.setItem(APP_CONFIG.preferencesKey, JSON.stringify(preferences));
}
