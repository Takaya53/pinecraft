export type SurvivalStatsState = {
  health: number;
  foodLevel: number;
  saturation: number;
  exhaustion: number;
  airTicks: number;
};

export type SurvivalTickResult = {
  drowningDamage: number;
};

export const MAX_AIR_TICKS = 300;

export class SurvivalStats {
  state: SurvivalStatsState;
  regenTimerSeconds: number;
  starvationTimerSeconds: number;
  drowningTimerSeconds: number;

  constructor(state: Partial<SurvivalStatsState> = {}) {
    this.state = {
      health: state.health ?? 20,
      foodLevel: state.foodLevel ?? 20,
      saturation: state.saturation ?? 5,
      exhaustion: state.exhaustion ?? 0,
      airTicks: state.airTicks ?? MAX_AIR_TICKS
    };
    this.regenTimerSeconds = 0;
    this.starvationTimerSeconds = 0;
    this.drowningTimerSeconds = 0;
  }

  tick(deltaSeconds: number, options: { eyesInWater?: boolean } = {}): SurvivalTickResult {
    const result: SurvivalTickResult = { drowningDamage: 0 };
    if (this.isDead()) {
      return result;
    }

    this.consumeExhaustion();
    result.drowningDamage = this.tickAir(deltaSeconds, options.eyesInWater === true);

    if (this.state.foodLevel >= 18 && this.state.health < 20) {
      this.regenTimerSeconds += deltaSeconds;
      if (this.regenTimerSeconds >= 4) {
        this.heal(1);
        this.addExhaustion(6);
        this.regenTimerSeconds = 0;
      }
    } else {
      this.regenTimerSeconds = 0;
    }

    if (this.state.foodLevel <= 0 && this.state.health > 1) {
      this.starvationTimerSeconds += deltaSeconds;
      if (this.starvationTimerSeconds >= 4) {
        this.applyDamage(1);
        this.starvationTimerSeconds = 0;
      }
    } else {
      this.starvationTimerSeconds = 0;
    }

    return result;
  }

  addExhaustion(amount: number): void {
    this.state.exhaustion = Math.max(0, this.state.exhaustion + amount);
    this.consumeExhaustion();
  }

  applyDamage(amount: number): void {
    this.state.health = clamp(this.state.health - Math.max(0, amount), 0, 20);
  }

  heal(amount: number): void {
    this.state.health = clamp(this.state.health + Math.max(0, amount), 0, 20);
  }

  eat(nutrition: number, saturationModifier: number): void {
    const clampedNutrition = Math.max(0, nutrition);
    this.state.foodLevel = clamp(this.state.foodLevel + clampedNutrition, 0, 20);
    this.state.saturation = clamp(
      this.state.saturation + clampedNutrition * Math.max(0, saturationModifier) * 2,
      0,
      this.state.foodLevel
    );
  }

  canEat(): boolean {
    return this.state.foodLevel < 20 && !this.isDead();
  }

  isDead(): boolean {
    return this.state.health <= 0;
  }

  reset(state: Partial<SurvivalStatsState> = {}): void {
    this.state = {
      health: state.health ?? 20,
      foodLevel: state.foodLevel ?? 20,
      saturation: state.saturation ?? 5,
      exhaustion: state.exhaustion ?? 0,
      airTicks: state.airTicks ?? MAX_AIR_TICKS
    };
    this.regenTimerSeconds = 0;
    this.starvationTimerSeconds = 0;
    this.drowningTimerSeconds = 0;
  }

  applyFallDamage(fallDistance: number): number {
    const damage = Math.max(0, Math.floor(fallDistance - 3));
    if (damage > 0) {
      this.applyDamage(damage);
    }
    return damage;
  }

  private consumeExhaustion(): void {
    while (this.state.exhaustion >= 4) {
      this.state.exhaustion -= 4;
      if (this.state.saturation > 0) {
        this.state.saturation = Math.max(0, this.state.saturation - 1);
      } else {
        this.state.foodLevel = Math.max(0, this.state.foodLevel - 1);
      }
    }
  }

  private tickAir(deltaSeconds: number, eyesInWater: boolean): number {
    if (!eyesInWater) {
      this.state.airTicks = clamp(this.state.airTicks + deltaSeconds * 20 * 4, 0, MAX_AIR_TICKS);
      this.drowningTimerSeconds = 0;
      return 0;
    }

    const oldAirTicks = this.state.airTicks;
    const drainedTicks = deltaSeconds * 20;
    this.state.airTicks = Math.max(0, oldAirTicks - drainedTicks);
    if (this.state.airTicks > 0) {
      this.drowningTimerSeconds = 0;
      return 0;
    }

    const excessDrowningSeconds = Math.max(0, (drainedTicks - oldAirTicks) / 20);
    this.drowningTimerSeconds += excessDrowningSeconds;
    if (this.drowningTimerSeconds < 1) {
      return 0;
    }

    const hits = Math.floor(this.drowningTimerSeconds);
    this.drowningTimerSeconds -= hits;
    const damage = hits * 2;
    this.applyDamage(damage);
    return damage;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
