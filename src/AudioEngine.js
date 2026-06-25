/**
 * AudioEngine.js — APEX RACER X
 * 7 fully synthesised sounds. Zero audio files.
 */
export class AudioEngine {
  constructor() { this.ctx=null;this.ready=false;this.master=null;this._eng1=null;this._eng2=null;this._engGain=null;this._engFilter=null;this._turbo=null;this._turboGain=null;this._tyre=null;this._tyreGain=null;this._rain=null;this._rainGain=null;this._wind=null;this._windGain=null;this._crowd=null;this._crowdGain=null;this._lastGear=1; }
  init() {
    if (this.ready) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain(); this.master.gain.value = 0.7; this.master.connect(this.ctx.destination);
      this._buildEngine(); this._buildTurbo(); this._buildTyre(); this._buildRain(); this._buildWind(); this._buildCrowd();
      this.ready = true;
    } catch (e) { console.warn('AudioEngine:', e); }
  }
  resume() { if (this.ctx?.state === 'suspended') this.ctx.resume(); }
  _noise(s=2) { const b=this.ctx.createBuffer(1,this.ctx.sampleRate*s,this.ctx.sampleRate);const d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b; }
  _buildEngine() { const dist=this.ctx.createWaveShaper();const c=new Float32Array(256);for(let i=0;i<256;i++){const x=i*2/256-1;c[i]=x*(1+Math.abs(x)*2)/(1+Math.abs(x)*2*Math.abs(x));}dist.curve=c;this._engFilter=this.ctx.createBiquadFilter();this._engFilter.type='bandpass';this._engFilter.frequency.value=800;this._engFilter.Q.value=1.2;this._engGain=this.ctx.createGain();this._engGain.gain.value=0;[55,56.5].forEach((f,i)=>{const o=this.ctx.createOscillator();o.type=i===0?'sawtooth':'square';o.frequency.value=f;o.connect(dist);o.start();if(i===0)this._eng1=o;else this._eng2=o;});dist.connect(this._engFilter);this._engFilter.connect(this._engGain);this._engGain.connect(this.master); }
  _buildTurbo() { this._turbo=this.ctx.createOscillator();this._turbo.type='sine';this._turbo.frequency.value=800;const f=this.ctx.createBiquadFilter();f.type='highpass';f.frequency.value=900;this._turboGain=this.ctx.createGain();this._turboGain.gain.value=0;this._turbo.connect(f);f.connect(this._turboGain);this._turboGain.connect(this.master);this._turbo.start(); }
  _buildTyre() { const s=this.ctx.createBufferSource();s.buffer=this._noise(.5);s.loop=true;const f=this.ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;f.Q.value=3;this._tyreGain=this.ctx.createGain();this._tyreGain.gain.value=0;s.connect(f);f.connect(this._tyreGain);this._tyreGain.connect(this.master);s.start();this._tyre=s; }
  _buildRain() { const s=this.ctx.createBufferSource();s.buffer=this._noise(2);s.loop=true;const f=this.ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=600;this._rainGain=this.ctx.createGain();this._rainGain.gain.value=0;s.connect(f);f.connect(this._rainGain);this._rainGain.connect(this.master);s.start();this._rain=s; }
  _buildWind() { const s=this.ctx.createBufferSource();s.buffer=this._noise(3);s.loop=true;const f=this.ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=300;f.Q.value=0.8;this._windGain=this.ctx.createGain();this._windGain.gain.value=0;s.connect(f);f.connect(this._windGain);this._windGain.connect(this.master);s.start();this._wind=s; }
  _buildCrowd() { const b=this.ctx.createBuffer(2,this.ctx.sampleRate*4,this.ctx.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*0.3;}const s=this.ctx.createBufferSource();s.buffer=b;s.loop=true;const f=this.ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=800;this._crowdGain=this.ctx.createGain();this._crowdGain.gain.value=0;s.connect(f);f.connect(this._crowdGain);this._crowdGain.connect(this.master);s.start();this._crowd=s; }
  _s(n,t,tc=0.05){if(!n||!this.ctx)return;n.gain.setTargetAtTime(t,this.ctx.currentTime,tc);}
  _f(o,f,tc=0.08){if(!o||!this.ctx)return;o.frequency.setTargetAtTime(f,this.ctx.currentTime,tc);}
  update(speed,rpm,gear,wxState,wxGrip,wxWind,fwd,brk,gameOn){
    if(!this.ready)return;if(!gameOn){[this._engGain,this._turboGain,this._tyreGain,this._rainGain,this._windGain,this._crowdGain].forEach(g=>this._s(g,0,.3));return;}
    const sn=Math.min(1,speed/480),rn=Math.max(0,Math.min(1,rpm));
    this._f(this._eng1,55+(260-55)*rn);this._f(this._eng2,(55+(260-55)*rn)*1.015);
    this._s(this._engGain,fwd?0.22+sn*0.18:0.10+sn*0.08);
    if(this._engFilter)this._engFilter.frequency.setTargetAtTime(400+rn*1800,this.ctx.currentTime,.08);
    this._f(this._turbo,800+rn*2400,.12);this._s(this._turboGain,fwd&&sn>0.35?sn*0.06:0,.1);
    this._s(this._tyreGain,brk&&speed>40&&wxGrip<0.95?Math.min(.18,(1-wxGrip)*.3+sn*.1):0,.05);
    this._s(this._rainGain,[0,0,.06,.14,.22,.30][wxState]||0,.8);
    this._s(this._windGain,wxState>=3?Math.min(.12,Math.abs(wxWind)*.005+.06):0,1.0);
    this._s(this._crowdGain,sn>.1?.06:0,1.0);
    if(gear!==this._lastGear){this.playGearShift();this._lastGear=gear;}
  }
  playBoost(){if(!this.ready)return;const o=this.ctx.createOscillator();const g=this.ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(200,this.ctx.currentTime);o.frequency.linearRampToValueAtTime(800,this.ctx.currentTime+.3);g.gain.setValueAtTime(.3,this.ctx.currentTime);g.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.5);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+.5);}
  playLanding(impact){if(!this.ready)return;const o=this.ctx.createOscillator();const g=this.ctx.createGain();o.type='sine';o.frequency.setValueAtTime(120-impact*80,this.ctx.currentTime);o.frequency.exponentialRampToValueAtTime(20,this.ctx.currentTime+.4);g.gain.setValueAtTime(Math.min(.8,impact),this.ctx.currentTime);g.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.4);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+.5);}
  playGearShift(){if(!this.ready)return;const o=this.ctx.createOscillator();const g=this.ctx.createGain();o.type='square';o.frequency.value=440;g.gain.setValueAtTime(.08,this.ctx.currentTime);g.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.06);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+.06);}
  crowdCheer(){if(!this.ready||!this._crowdGain)return;this._s(this._crowdGain,.25,.1);setTimeout(()=>this._s(this._crowdGain,.06,.5),2500);}
}
