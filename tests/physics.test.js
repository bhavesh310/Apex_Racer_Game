/**
 * physics.test.js — APEX RACER X
 * 30 unit tests. Run: npm test
 */
import { describe, it, expect } from 'vitest';
import { calcStars, calcGear, calcRPM, applyRollingFriction, integratePosition, CAR_HALF_H } from '../src/Physics.js';

describe('calcStars', () => {
  const par = [120, 140, 170, 200];
  it('5★ at par',        () => expect(calcStars(par, 120)).toBe(5));
  it('5★ below par',     () => expect(calcStars(par, 90)).toBe(5));
  it('4★ between t5-t4', () => expect(calcStars(par, 130)).toBe(4));
  it('4★ at t4',         () => expect(calcStars(par, 140)).toBe(4));
  it('3★ between t4-t3', () => expect(calcStars(par, 155)).toBe(3));
  it('3★ at t3',         () => expect(calcStars(par, 170)).toBe(3));
  it('2★ between t3-t2', () => expect(calcStars(par, 185)).toBe(2));
  it('2★ at t2',         () => expect(calcStars(par, 200)).toBe(2));
  it('1★ over t2',       () => expect(calcStars(par, 201)).toBe(1));
  it('1★ very slow',     () => expect(calcStars(par, 999)).toBe(1));
});

describe('calcGear', () => {
  it('gear 1 at zero speed',  () => expect(calcGear(0, 1.0)).toBe(1));
  it('gear 1 at low speed',   () => expect(calcGear(30, 1.0)).toBe(1));
  it('advances with speed',   () => expect(calcGear(200, 1.0)).toBeGreaterThan(2));
  it('never exceeds 7',       () => expect(calcGear(9999, 1.0)).toBe(7));
  it('scales with spdMul',    () => expect(calcGear(200, 2.0)).toBeLessThan(calcGear(200, 0.5)));
});

describe('calcRPM', () => {
  it('returns 0–1',           () => { const r = calcRPM(200,3,1); expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThanOrEqual(1); });
  it('minimum 0.15 at zero',  () => expect(calcRPM(0,1,1)).toBe(0.15));
  it('clamps at 1.0 max',     () => expect(calcRPM(9999,1,1)).toBe(1));
});

describe('applyRollingFriction', () => {
  it('reduces velocity',         () => expect(applyRollingFriction(300, 1/60)).toBeLessThan(300));
  it('approaches zero large dt', () => expect(applyRollingFriction(300, 100)).toBeCloseTo(0, 3));
  it('preserves sign',           () => expect(applyRollingFriction(-200, 1/60)).toBeLessThan(0));
  it('frame-rate independent: 60fps = 120fps', () => {
    let v60 = 300; for (let i=0;i<60;i++) v60 = applyRollingFriction(v60, 1/60);
    let v120 = 300; for (let i=0;i<120;i++) v120 = applyRollingFriction(v120, 1/120);
    expect(Math.abs(v60 - v120) / Math.max(v60, 0.01)).toBeLessThan(0.05);
  });
});

describe('integratePosition', () => {
  const mk = (o={}) => ({ x:400,y:274,vx:0,vy:0,angle:0,angV:0,grounded:true,prevGnd:true,airF:0,prevVY:0,boostCD:0,bumpShake:0,...o });
  it('throttle accelerates',      () => { const c=mk(); integratePosition(c,1/60,.5,1,true,false,false,300,0); expect(c.vx).toBeGreaterThan(0); });
  it('no throttle = no accel',    () => { const c=mk(); integratePosition(c,1/60,.5,1,false,false,false,300,0); expect(c.vx).toBeCloseTo(0,3); });
  it('brake reduces velocity',    () => { const c=mk({vx:200}); integratePosition(c,1/60,.5,1,false,true,false,300,0); expect(c.vx).toBeLessThan(200); });
  it('airborne increases airF',   () => { const c=mk({y:100,grounded:false}); integratePosition(c,1/60,.5,1,false,false,false,900,0); expect(c.airF).toBe(1); });
  it('gravity pulls down in air', () => { const c=mk({y:100,grounded:false,vy:0}); integratePosition(c,1/60,.5,1,false,false,false,900,0); expect(c.vy).toBeGreaterThan(0); });
  it('snaps to ground',           () => { const c=mk({y:272}); integratePosition(c,1/60,.5,1,false,false,false,300,0); expect(c.grounded).toBe(true); expect(c.y).toBe(300-CAR_HALF_H); });
  it('uphill slows car',          () => { const c=mk({y:274,vx:200}); integratePosition(c,1/60,.5,1,false,false,false,300,0.5); expect(c.vx).toBeLessThan(200); });
  it('downhill speeds car',       () => { const c=mk({y:274,vx:50}); integratePosition(c,1/60,.5,1,false,false,false,300,-0.5); expect(c.vx).toBeGreaterThan(50); });
  it('micro-slope deadzone: flat road no bleed', () => {
    const c=mk({y:274,vx:100});
    integratePosition(c,1/60,.5,1,true,false,false,300,0.02); // tiny slope < 0.035 threshold
    expect(c.vx).toBeGreaterThan(100); // should still accelerate, not slow down
  });
  it('60Hz vs 120Hz parity within 5%', () => {
    const c60=mk({y:274}); for(let i=0;i<60;i++) integratePosition(c60,1/60,.5,1,true,false,false,300,0);
    const c120=mk({y:274}); for(let i=0;i<120;i++) integratePosition(c120,1/120,.5,1,true,false,false,300,0);
    expect(Math.abs(c60.vx-c120.vx)/Math.max(c60.vx,0.01)).toBeLessThan(0.05);
  });
});
