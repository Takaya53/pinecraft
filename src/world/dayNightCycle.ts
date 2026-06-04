export type DayNightVisuals = {
  phase: DayNightPhase;
  skyColor: number;
  ambientIntensity: number;
  sunlightIntensity: number;
  skyDarkness: number;
  skyLightLevel: number;
  sunDirection: { x: number; y: number; z: number };
  moonDirection: { x: number; y: number; z: number };
  sunVisible: boolean;
  moonVisible: boolean;
};

export type DayNightPhase = "day" | "sunset" | "night" | "sunrise";

export const DAY_LENGTH_TICKS = 24000;
export const TICKS_PER_SECOND = 20;

export const DAY_NIGHT_TIMES = {
  dayStart: 0,
  timeSetDay: 1000,
  noon: 6000,
  sunsetStart: 12000,
  nightStart: 13000,
  midnight: 18000,
  sunriseStart: 23000,
  nextDay: 24000,
  clearLightStartsFalling: 12040,
  clearLightReachesFour: 13670,
  clearLightStartsRising: 22331,
  clearLightReachesFifteen: 23961
} as const;

export class DayNightCycle {
  timeOfDay: number;

  constructor(timeOfDay = 1000) {
    this.timeOfDay = normalizeTime(timeOfDay);
  }

  advance(deltaSeconds: number): void {
    this.timeOfDay = normalizeTime(this.timeOfDay + deltaSeconds * TICKS_PER_SECOND);
  }

  visuals(): DayNightVisuals {
    const skyLightLevel = skyLightLevelForTime(this.timeOfDay);
    const daylightAmount = (skyLightLevel - 4) / 11;
    const twilightAmount = twilightAmountForTime(this.timeOfDay);
    const skyColor = mixColor(
      mixColor(0x101522, 0x9cc7ec, daylightAmount),
      0xf1a15a,
      twilightAmount * 0.48
    );
    const sunDirection = celestialDirection(this.timeOfDay);
    const moonDirection = {
      x: -sunDirection.x,
      y: -sunDirection.y,
      z: -sunDirection.z
    };
    return {
      phase: phaseForTime(this.timeOfDay),
      skyColor,
      ambientIntensity: mix(0.16, 0.8, daylightAmount),
      sunlightIntensity: mix(0.02, 1.8, daylightAmount),
      skyDarkness: mix(0.52, 0, daylightAmount),
      skyLightLevel,
      sunDirection,
      moonDirection,
      sunVisible: sunDirection.y > -0.08,
      moonVisible: moonDirection.y > -0.08
    };
  }
}

export function phaseForTime(timeOfDay: number): DayNightPhase {
  const time = normalizeTime(timeOfDay);
  if (time >= DAY_NIGHT_TIMES.sunriseStart || time < DAY_NIGHT_TIMES.dayStart) {
    return "sunrise";
  }
  if (time < DAY_NIGHT_TIMES.sunsetStart) {
    return "day";
  }
  if (time < DAY_NIGHT_TIMES.nightStart) {
    return "sunset";
  }
  return "night";
}

export function canSleepAtTime(timeOfDay: number): boolean {
  const time = normalizeTime(timeOfDay);
  return time >= 12542 && time < DAY_NIGHT_TIMES.sunriseStart;
}

export function wakeTimeAfterSleep(): number {
  return DAY_NIGHT_TIMES.timeSetDay;
}

export function skyLightLevelForTime(timeOfDay: number): number {
  const time = normalizeTime(timeOfDay);
  if (time >= DAY_NIGHT_TIMES.clearLightStartsFalling && time <= DAY_NIGHT_TIMES.clearLightReachesFour) {
    const amount = (time - DAY_NIGHT_TIMES.clearLightStartsFalling) /
      (DAY_NIGHT_TIMES.clearLightReachesFour - DAY_NIGHT_TIMES.clearLightStartsFalling);
    return mix(15, 4, amount);
  }
  if (time > DAY_NIGHT_TIMES.clearLightReachesFour && time < DAY_NIGHT_TIMES.clearLightStartsRising) {
    return 4;
  }
  if (time >= DAY_NIGHT_TIMES.clearLightStartsRising && time <= DAY_NIGHT_TIMES.clearLightReachesFifteen) {
    const amount = (time - DAY_NIGHT_TIMES.clearLightStartsRising) /
      (DAY_NIGHT_TIMES.clearLightReachesFifteen - DAY_NIGHT_TIMES.clearLightStartsRising);
    return mix(4, 15, amount);
  }
  return 15;
}

function celestialDirection(timeOfDay: number): { x: number; y: number; z: number } {
  const angle = (normalizeTime(timeOfDay) / DAY_LENGTH_TICKS) * Math.PI * 2;
  return {
    x: -Math.cos(angle),
    y: Math.sin(angle),
    z: -0.18
  };
}

function twilightAmountForTime(timeOfDay: number): number {
  const time = normalizeTime(timeOfDay);
  const sunset = pulse(time, 12000, 13670);
  const sunrise = time >= 22331 ? pulse(time, 22331, 24000) : 0;
  return Math.max(sunset, sunrise);
}

function pulse(time: number, start: number, end: number): number {
  if (time < start || time > end) {
    return 0;
  }
  const amount = (time - start) / (end - start);
  return Math.sin(amount * Math.PI);
}

function normalizeTime(timeOfDay: number): number {
  return ((timeOfDay % DAY_LENGTH_TICKS) + DAY_LENGTH_TICKS) % DAY_LENGTH_TICKS;
}

function mix(left: number, right: number, amount: number): number {
  return left + (right - left) * amount;
}

function mixColor(left: number, right: number, amount: number): number {
  const r = Math.round(mix((left >> 16) & 0xff, (right >> 16) & 0xff, amount));
  const g = Math.round(mix((left >> 8) & 0xff, (right >> 8) & 0xff, amount));
  const b = Math.round(mix(left & 0xff, right & 0xff, amount));
  return (r << 16) | (g << 8) | b;
}
