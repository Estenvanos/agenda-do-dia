export type DayId = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom';
export type DemandLevel = 'livre' | 'medio' | 'continuo';
export type StudyPhase = 'f1' | 'f2' | 'f3';
export type StudyTheme = 'seg' | 'ter' | 'qua' | 'qui' | 'sex';
export type CategoryId =
  | 'projeto'
  | 'estudo'
  | 'trabalho'
  | 'treino'
  | 'pessoal'
  | 'descanso'
  | 'sono'
  | 'rotina';

export type ScheduleTag = 'opcional' | 'inegociável' | '1ª do mês: manutenção' | null;
export type ScheduleSlot = 'trilha' | 'trilha2' | 'leet' | 'habito' | null;

export interface CategoryDefinition {
  color: string;
  name: string;
}

export interface ScheduleBlock {
  start: string;
  end: string;
  title: string;
  detail: string;
  category: CategoryId;
  tag: ScheduleTag;
  slot: ScheduleSlot;
}

export interface StudyTopic {
  t: string;
  d: string;
}

export interface StudyPhaseDefinition {
  note: string;
  seg: StudyTopic;
  ter: StudyTopic;
  qua: StudyTopic;
  qui: StudyTopic;
  sex: StudyTopic;
}

export interface AgendaDay {
  name: string;
  shortName: string;
  meta: string;
  hasDemand: boolean;
  note?: string;
  blocks?: ScheduleBlock[];
  morning?: ScheduleBlock[];
  getWorkBlocks?: (level: DemandLevel) => ScheduleBlock[];
  evening?: ScheduleBlock[];
}

export interface AgendaPreferences {
  selectedDay: DayId;
  demandLevel: DemandLevel;
  studyPhase: StudyPhase;
  density: 'comfortable' | 'compact';
  showDetails: boolean;
  showTotals: boolean;
}

export interface CategoryTotal {
  category: CategoryId;
  minutes: number;
  formatted: string;
}
