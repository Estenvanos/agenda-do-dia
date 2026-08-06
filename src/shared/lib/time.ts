export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    throw new Error(`Horário inválido: ${time}`);
  }
  return hours * 60 + minutes;
}

export function durationInMinutes(start: string, end: string): number {
  let duration = timeToMinutes(end) - timeToMinutes(start);
  if (duration < 0) duration += 24 * 60;
  return duration;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h${String(remainder).padStart(2, '0')}` : `${hours}h`;
}

export function isCurrentTimeInRange(now: Date, start: string, end: string): boolean {
  const current = now.getHours() * 60 + now.getMinutes();
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  if (endMinutes >= startMinutes) {
    return current >= startMinutes && current < endMinutes;
  }

  return current >= startMinutes || current < endMinutes;
}
