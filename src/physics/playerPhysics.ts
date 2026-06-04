import type { Vec3i } from "../core/constants.ts";
import { blockIntersectsAabb, offsetAabb, playerAabb, type Aabb } from "./aabb.ts";

export const PLAYER_WIDTH = 0.6;
export const PLAYER_HEIGHT = 1.8;
export const PLAYER_EYE_HEIGHT = 1.62;
export const PLAYER_STEP_HEIGHT = 0.6;
export const PLAYER_AUTO_STEP_HEIGHT = 1.01;

export type PlayerPhysicsState = {
  position: Vec3i;
  velocity: Vec3i;
  onGround: boolean;
  inWater: boolean;
  eyesInWater: boolean;
};

export type PlayerMoveInput = {
  forward: number;
  strafe: number;
  jump: boolean;
  yaw: number;
  sprint?: boolean;
};

export type CollisionWorld = {
  isSolidBlockLoaded(worldX: number, worldY: number, worldZ: number): boolean;
  getBlockTypeIdLoaded?(worldX: number, worldY: number, worldZ: number): string | null;
  isFluidBlockLoaded?(worldX: number, worldY: number, worldZ: number): boolean;
  getBlockLightLevelLoaded?(worldX: number, worldY: number, worldZ: number): number;
  getMotionBlockingHeightLoaded?(worldX: number, worldZ: number): number | null;
};

const GRAVITY = 24;
const JUMP_SPEED = 8.4;
const WALK_SPEED = 4.3;
const SPRINT_SPEED = 5.6;
const TERMINAL_VELOCITY = -90;
const WATER_WALK_SPEED = 2.05;
const WATER_SPRINT_SPEED = 2.7;
const WATER_GRAVITY = 2.8;
const WATER_SWIM_ACCELERATION = 13;
const WATER_SWIM_SPEED = 3.2;
const WATER_VERTICAL_DRAG = 0.58;
const WATER_TERMINAL_VELOCITY = -3.9;
const EPSILON = 0.0001;

export class PlayerPhysics {
  state: PlayerPhysicsState;

  constructor(position: Vec3i) {
    this.state = {
      position: { ...position },
      velocity: { x: 0, y: 0, z: 0 },
      onGround: false,
      inWater: false,
      eyesInWater: false
    };
  }

  eyePosition(): Vec3i {
    return {
      x: this.state.position.x,
      y: this.state.position.y + PLAYER_EYE_HEIGHT,
      z: this.state.position.z
    };
  }

  step(world: CollisionWorld, input: PlayerMoveInput, deltaSeconds: number): void {
    const initialAabb = playerAabb(this.state.position, PLAYER_WIDTH, PLAYER_HEIGHT);
    const inWater = fluidBlocksIntersecting(world, initialAabb).length > 0;
    this.state.inWater = inWater;
    this.state.eyesInWater = pointInFluid(world, this.eyePosition());

    const speed = inWater
      ? input.sprint ? WATER_SPRINT_SPEED : WATER_WALK_SPEED
      : input.sprint ? SPRINT_SPEED : WALK_SPEED;
    const movement = horizontalMovement(input.forward, input.strafe, input.yaw, speed);
    this.state.velocity.x = movement.x;
    this.state.velocity.z = movement.z;

    if (inWater) {
      this.state.onGround = false;
      this.state.velocity.y *= Math.pow(WATER_VERTICAL_DRAG, deltaSeconds * 20);
      if (input.jump) {
        this.state.velocity.y = Math.min(
          WATER_SWIM_SPEED,
          this.state.velocity.y + WATER_SWIM_ACCELERATION * deltaSeconds
        );
      } else {
        this.state.velocity.y -= WATER_GRAVITY * deltaSeconds;
      }
      this.state.velocity.y = Math.max(WATER_TERMINAL_VELOCITY, this.state.velocity.y);
    } else if (input.jump && this.state.onGround) {
      this.state.velocity.y = JUMP_SPEED;
      this.state.onGround = false;
    }

    if (!inWater) {
      this.state.velocity.y = Math.max(
        TERMINAL_VELOCITY,
        this.state.velocity.y - GRAVITY * deltaSeconds
      );
    }

    let aabb = playerAabb(this.state.position, PLAYER_WIDTH, PLAYER_HEIGHT);
    const moveX = this.state.velocity.x * deltaSeconds;
    const resolvedX = resolveHorizontalAxis(world, aabb, "x", moveX, this.state.onGround);
    this.state.position.x += resolvedX.delta;
    this.state.position.y += resolvedX.stepUp;
    this.state.velocity.x = resolvedX.collided ? 0 : this.state.velocity.x;
    aabb = offsetAabb(aabb, resolvedX.delta, resolvedX.stepUp, 0);

    const moveY = this.state.velocity.y * deltaSeconds;
    const resolvedY = resolveAxis(world, aabb, "y", moveY);
    this.state.position.y += resolvedY.delta;
    this.state.onGround = resolvedY.collided && moveY < 0;
    this.state.velocity.y = resolvedY.collided ? 0 : this.state.velocity.y;
    aabb = offsetAabb(aabb, 0, resolvedY.delta, 0);

    const moveZ = this.state.velocity.z * deltaSeconds;
    const resolvedZ = resolveHorizontalAxis(world, aabb, "z", moveZ, this.state.onGround);
    this.state.position.z += resolvedZ.delta;
    this.state.position.y += resolvedZ.stepUp;
    this.state.velocity.z = resolvedZ.collided ? 0 : this.state.velocity.z;

    const finalAabb = playerAabb(this.state.position, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.state.inWater = fluidBlocksIntersecting(world, finalAabb).length > 0;
    this.state.eyesInWater = pointInFluid(world, this.eyePosition());
  }
}

function horizontalMovement(forward: number, strafe: number, yaw: number, speed: number): { x: number; z: number } {
  const length = Math.hypot(forward, strafe);
  if (length === 0) {
    return { x: 0, z: 0 };
  }

  const normalizedForward = forward / length;
  const normalizedStrafe = strafe / length;
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);

  return {
    x: (normalizedStrafe * cos - normalizedForward * sin) * speed,
    z: (-normalizedStrafe * sin - normalizedForward * cos) * speed
  };
}

function resolveAxis(
  world: CollisionWorld,
  aabb: Aabb,
  axis: "x" | "y" | "z",
  delta: number
): { delta: number; collided: boolean } {
  if (delta === 0) {
    return { delta, collided: false };
  }

  let resolvedDelta = delta;
  const moved = offsetAabb(
    aabb,
    axis === "x" ? resolvedDelta : 0,
    axis === "y" ? resolvedDelta : 0,
    axis === "z" ? resolvedDelta : 0
  );
  const swept = sweptAabb(aabb, moved);

  for (const block of solidBlocksIntersecting(world, swept)) {
    if (axis === "x") {
      if (delta > 0) {
        resolvedDelta = Math.min(resolvedDelta, block.x - aabb.maxX - EPSILON);
      } else {
        resolvedDelta = Math.max(resolvedDelta, block.x + 1 - aabb.minX + EPSILON);
      }
    } else if (axis === "y") {
      if (delta > 0) {
        resolvedDelta = Math.min(resolvedDelta, block.y - aabb.maxY - EPSILON);
      } else {
        resolvedDelta = Math.max(resolvedDelta, block.y + 1 - aabb.minY + EPSILON);
      }
    } else if (delta > 0) {
      resolvedDelta = Math.min(resolvedDelta, block.z - aabb.maxZ - EPSILON);
    } else {
      resolvedDelta = Math.max(resolvedDelta, block.z + 1 - aabb.minZ + EPSILON);
    }
  }

  return {
    delta: resolvedDelta,
    collided: Math.abs(resolvedDelta - delta) > EPSILON
  };
}

function resolveHorizontalAxis(
  world: CollisionWorld,
  aabb: Aabb,
  axis: "x" | "z",
  delta: number,
  onGround: boolean
): { delta: number; stepUp: number; collided: boolean } {
  const resolved = resolveAxis(world, aabb, axis, delta);
  if (!resolved.collided || !onGround || delta === 0) {
    return { ...resolved, stepUp: 0 };
  }

  const raised = offsetAabb(aabb, 0, PLAYER_AUTO_STEP_HEIGHT, 0);
  if (solidBlocksIntersecting(world, raised).length > 0) {
    return { ...resolved, stepUp: 0 };
  }

  const raisedResolved = resolveAxis(world, raised, axis, delta);
  if (raisedResolved.collided) {
    return { ...resolved, stepUp: 0 };
  }

  return {
    delta: raisedResolved.delta,
    stepUp: PLAYER_AUTO_STEP_HEIGHT,
    collided: false
  };
}

function sweptAabb(from: Aabb, to: Aabb): Aabb {
  return {
    minX: Math.min(from.minX, to.minX),
    minY: Math.min(from.minY, to.minY),
    minZ: Math.min(from.minZ, to.minZ),
    maxX: Math.max(from.maxX, to.maxX),
    maxY: Math.max(from.maxY, to.maxY),
    maxZ: Math.max(from.maxZ, to.maxZ)
  };
}

function solidBlocksIntersecting(world: CollisionWorld, aabb: Aabb): Vec3i[] {
  const blocks = [];
  const minX = Math.floor(aabb.minX);
  const maxX = Math.floor(aabb.maxX - EPSILON);
  const minY = Math.floor(aabb.minY);
  const maxY = Math.floor(aabb.maxY - EPSILON);
  const minZ = Math.floor(aabb.minZ);
  const maxZ = Math.floor(aabb.maxZ - EPSILON);

  for (let y = minY; y <= maxY; y += 1) {
    for (let z = minZ; z <= maxZ; z += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        if (world.isSolidBlockLoaded(x, y, z) && blockIntersectsAabb(x, y, z, aabb)) {
          blocks.push({ x, y, z });
        }
      }
    }
  }

  return blocks;
}

function fluidBlocksIntersecting(world: CollisionWorld, aabb: Aabb): Vec3i[] {
  if (!world.isFluidBlockLoaded) {
    return [];
  }

  const blocks = [];
  const minX = Math.floor(aabb.minX);
  const maxX = Math.floor(aabb.maxX - EPSILON);
  const minY = Math.floor(aabb.minY);
  const maxY = Math.floor(aabb.maxY - EPSILON);
  const minZ = Math.floor(aabb.minZ);
  const maxZ = Math.floor(aabb.maxZ - EPSILON);

  for (let y = minY; y <= maxY; y += 1) {
    for (let z = minZ; z <= maxZ; z += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        if (world.isFluidBlockLoaded(x, y, z) && blockIntersectsAabb(x, y, z, aabb)) {
          blocks.push({ x, y, z });
        }
      }
    }
  }

  return blocks;
}

function pointInFluid(world: CollisionWorld, point: Vec3i): boolean {
  return world.isFluidBlockLoaded?.(
    Math.floor(point.x),
    Math.floor(point.y),
    Math.floor(point.z)
  ) ?? false;
}
