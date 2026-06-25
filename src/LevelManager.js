/**
 * LevelManager.js — APEX RACER X
 * Level definitions, terrain, star logic, localStorage persistence.
 */
import { calcStars } from './Physics.js';

export const LEVELS = [
  { id:1,  name:'MEADOW',   color:'#22c55e', spdMul:0.38, grip:1.00, slopeAmp:45,  weatherBias:0,    trackLen:18000, desc:'Gentle rolling hills.',         timePar:[120,140,170,200] },
  { id:2,  name:'FARMLAND', color:'#84cc16', spdMul:0.41, grip:0.97, slopeAmp:80,  weatherBias:0.05, trackLen:19000, desc:'Wider slopes, light wind.',     timePar:[126,148,180,214] },
  { id:3,  name:'FOREST',   color:'#16a34a', spdMul:0.44, grip:0.94, slopeAmp:120, weatherBias:0.10, trackLen:20000, desc:'Moderate hills, clouds.',       timePar:[132,156,190,228] },
  { id:4,  name:'HIGHLAND', color:'#f5c518', spdMul:0.48, grip:0.90, slopeAmp:165, weatherBias:0.18, trackLen:21000, desc:'Real climbs, rain chance.',     timePar:[138,164,200,240] },
  { id:5,  name:'CANYON',   color:'#f97316', spdMul:0.52, grip:0.86, slopeAmp:215, weatherBias:0.28, trackLen:22000, desc:'Sharp drops, big air.',         timePar:[144,172,210,252] },
  { id:6,  name:'ALPINE',   color:'#60a5fa', spdMul:0.56, grip:0.80, slopeAmp:268, weatherBias:0.38, trackLen:23000, desc:'Switchbacks, rain likely.',     timePar:[150,180,220,264] },
  { id:7,  name:'VOLCANO',  color:'#ef4444', spdMul:0.61, grip:0.74, slopeAmp:328, weatherBias:0.50, trackLen:24000, desc:'Extreme, hot surfaces.',        timePar:[156,188,230,276] },
  { id:8,  name:'ARCTIC',   color:'#a5f3fc', spdMul:0.66, grip:0.62, slopeAmp:378, weatherBias:0.65, trackLen:25000, desc:'Ice everywhere.',               timePar:[162,196,240,288] },
  { id:9,  name:'STORM',    color:'#818cf8', spdMul:0.72, grip:0.50, slopeAmp:435, weatherBias:0.82, trackLen:26000, desc:'Rain + wind every meter.',      timePar:[168,204,250,300] },
  { id:10, name:'INFERNO',  color:'#ff3300', spdMul:0.80, grip:0.42, slopeAmp:492, weatherBias:1.00, trackLen:27000, desc:'Maximum chaos. Survive.',       timePar:[174,212,260,312] },
];

export class LevelManager {
  constructor() {
    this.currentId = 1; this.unlocked = [1]; this.stars = {};
    try { const sv = JSON.parse(localStorage.getItem('apexSave') || '{}'); if (Array.isArray(sv.u)) this.unlocked = sv.u; if (sv.s) this.stars = sv.s; } catch (_) {}
  }
  get current() { return LEVELS[this.currentId - 1]; }
  save() { try { localStorage.setItem('apexSave', JSON.stringify({ u: this.unlocked, s: this.stars })); } catch (_) {} }
  completeLevel(id, sec) {
    const earned = calcStars(LEVELS[id - 1].timePar, sec);
    if (earned > (this.stars[id] || 0)) this.stars[id] = earned;
    const next = id + 1;
    if (next <= 10 && !this.unlocked.includes(next)) this.unlocked.push(next);
    this.save(); return earned;
  }
  isUnlocked(id) { return this.unlocked.includes(id); }
  getBestStars(id) { return this.stars[id] || 0; }
}
