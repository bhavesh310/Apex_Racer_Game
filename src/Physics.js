/**
 * Physics.js — APEX RACER X
 * Delta-time normalised physics engine. All values per-second.
 * Frame-rate independent: identical at 60Hz, 120Hz, 144Hz.
 * Run: npm test
 */
export const GRAVITY_PS  = 1200;   // px/s² downward
export const MAX_VX_PS   = 480;    // px/s top speed
export const ACCEL_PS    = 432;    // px/s² engine thrust (0.18*60*40)
export const SLOPE_G_PS  = 430;    // px/s² slope gravity
export const JUMP_VY_PS  = 660;    // px/s jump velocity
export const ROLLING_PS  = 0.30;   // per-second friction (exp decay, 0.995^60)
export const BRAKE_PS    = 6.0;    // px/s² braking
export const CAR_HALF_H  = 26;     // px half-height of car hull

/** Exponential rolling friction — frame-rate independent */
export function applyRollingFriction(vx, dt) {
  return vx * Math.exp(-ROLLING_PS * dt);
}

/** Gear 1–7 from speed and spdMul */
export function calcGear(speed, spdMul) {
  const bp = [0, 60, 140, 230, 330, 380, 440];
  let g = 1;
  for (let i = 1; i < bp.length; i++) {
    if (speed > bp[i] * spdMul) g = i + 1;
  }
  return Math.min(7, g);
}

/** Normalised RPM 0–1 within current gear band */
export function calcRPM(speed, gear, spdMul) {
  const bp = [0, 60, 140, 230, 330, 380, 440, 520];
  const lo = bp[gear - 1] * spdMul;
  const hi = bp[Math.min(gear, bp.length - 1)] * spdMul;
  return Math.max(0.15, Math.min(1, (speed - lo) / (hi - lo + 0.01)));
}

/** Star rating from finish time vs par times */
export function calcStars(timePar, sec) {
  const [t5, t4, t3, t2] = timePar;
  if (sec <= t5) return 5;
  if (sec <= t4) return 4;
  if (sec <= t3) return 3;
  if (sec <= t2) return 2;
  return 1;
}

/** Full position integration — returns event flags */
export function integratePosition(car, dt, spdMul, grip, fwd, brk, jump, groundY, groundAngle) {
  const maxSpd = MAX_VX_PS * spdMul;
  const events = { landed: false, impact: 0, jumped: false };
  const carBot = car.y + CAR_HALF_H;
  car.prevGnd = car.grounded;
  car.grounded = (groundY - carBot) < 8;

  if (car.grounded) {
    car.y = groundY - CAR_HALF_H;
    car.vy = 0;
    if (!car.prevGnd && car.airF > 6) {
      events.landed = true;
      events.impact = Math.min(1, Math.abs(car.prevVY) / 660);
      car.bumpShake = events.impact * 14;
    }
    car.airF = 0;
    car.angle += (groundAngle - car.angle) * Math.min(1, 12 * dt);
    car.angV *= Math.exp(-10 * dt);
    if (fwd) car.vx += ACCEL_PS * spdMul * grip * dt;
    if (brk && car.vx > 0.1) { car.vx -= BRAKE_PS * spdMul * dt; car.vx = Math.max(0, car.vx); }
    if (jump) { car.vy = -JUMP_VY_PS * dt * 60; car.vx += 2.5 * spdMul * grip; car.boostCD = 55; events.jumped = true; }
    // Slope gravity with deadzone — micro-bumps don't bleed speed
    const sf = Math.sin(groundAngle);
    if (Math.abs(sf) > 0.035) car.vx -= sf * SLOPE_G_PS * spdMul * dt;
    car.vx = applyRollingFriction(car.vx, dt);
    car.vx = Math.max(-maxSpd * 0.25, Math.min(maxSpd, car.vx));
  } else {
    car.airF++;
    car.vy += GRAVITY_PS * dt;
    car.angV += Math.sin(car.angle) * 0.05 * dt;
    car.angle += car.angV * dt * 30;
  }
  car.prevVY = car.vy;
  car.x += car.vx * dt;
  car.y += car.vy * dt;
  return events;
}
