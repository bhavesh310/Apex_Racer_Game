/**
 * Weather.js — APEX RACER X
 * 6-state weather system with grip modifiers.
 */
export const WEATHER_NAMES = ['SUNNY','CLOUDY','DRIZZLE','RAIN','HEAVY RAIN','STORM'];
export const WEATHER_GRIP  = [1.00, 0.96, 0.85, 0.71, 0.57, 0.43];

export class WeatherSystem {
  constructor() {
    this.state = 0; this.target = 0; this.timer = 0; this.due = 800;
    this.wind = 5; this.lightning = 0;
    this.raindrops = []; this.clouds = [];
    for (let i = 0; i < 320; i++) this.raindrops.push({ x:Math.random()*2000, y:Math.random()*800, spd:10+Math.random()*8, len:16+Math.random()*14, a:0.25+Math.random()*0.4 });
    for (let i = 0; i < 12; i++) this.clouds.push({ x:Math.random()*2000, y:20+Math.random()*130, rw:160+Math.random()*260, rh:45+Math.random()*75, spd:0.25+Math.random()*0.45, a:0.5+Math.random()*0.4 });
  }
  update(dt, weatherBias = 0) {
    this.timer++;
    this.wind = 4 + Math.sin(Date.now() * 0.00015) * 8;
    const due = Math.round(800 - weatherBias * 400);
    if (this.timer > due) {
      this.timer = 0; this.due = due;
      if (Math.random() < weatherBias) this.target = Math.min(WEATHER_NAMES.length - 1, this.state + 1);
      else this.target = Math.floor(Math.random() * WEATHER_NAMES.length);
    }
    if (this.state !== this.target && Math.random() < 0.003) this.state = this.target;
    if (this.state === 5 && Math.random() < 0.004) this.lightning = 12;
    if (this.lightning > 0) this.lightning--;
  }
  get grip() { return WEATHER_GRIP[this.state]; }
  get name() { return WEATHER_NAMES[this.state]; }
  resetForLevel(weatherBias) {
    if (weatherBias >= 0.8) this.state = 2;
    else if (weatherBias >= 0.5) this.state = 1;
    else this.state = 0;
    this.target = this.state; this.timer = 0;
  }
}
