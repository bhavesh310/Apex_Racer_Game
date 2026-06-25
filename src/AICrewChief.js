/**
 * AICrewChief.js — APEX RACER X
 * Streaming Claude API + Web Speech synthesis. Zero DOM dependencies.
 */
export class AICrewChief {
  constructor() {
    this.busy = false; this.history = [];
    this.synth = window.speechSynthesis || null;
    this.voice = null; this.utterance = null;
    this._initVoice();
  }
  _initVoice() {
    if (!this.synth) return;
    const pick = () => {
      const voices = this.synth.getVoices(); if (!voices.length) return;
      const prio = ['Google UK English Male','Microsoft George','Daniel','Alex'];
      for (const n of prio) { const v = voices.find(v => v.name.includes(n)); if (v) { this.voice = v; return; } }
      this.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    };
    if (this.synth.getVoices().length) pick(); else this.synth.addEventListener('voiceschanged', pick);
  }
  speak(text) {
    if (!this.synth) return;
    this.synth.cancel();
    const clean = text.replace(/\*{1,2}|_{1,2}/g, '').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    if (this.voice) u.voice = this.voice;
    u.rate = 1.08; u.pitch = 0.88; u.volume = 1.0;
    u.onend = () => { this.utterance = null; };
    u.onerror = () => { this.utterance = null; };
    this.utterance = u;
    setTimeout(() => this.synth.speak(u), 150);
  }
  stop() { if (this.synth) this.synth.cancel(); this.utterance = null; }
  async call(prompt) {
    if (this.busy) return; this.busy = true;
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:80, stream:true, messages:[{ role:'user', content:prompt }] })
      });
      if (!resp.ok) throw new Error('API error');
      const reader = resp.body.getReader(); const decoder = new TextDecoder(); let full = '';
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        for (const line of decoder.decode(value, { stream:true }).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const d = line.slice(6); if (d === '[DONE]') break;
          try { const p = JSON.parse(d); if (p.type === 'content_block_delta' && p.delta?.text) full += p.delta.text; } catch (_) {}
        }
      }
      if (full.trim()) { this.history.unshift({ text:full.trim() }); if (this.history.length > 5) this.history.pop(); this.speak(full.trim()); }
    } catch (_) { this._fallback(); } finally { this.busy = false; }
  }
  _fallback() {
    const msgs = ['Gap closing -- hold the pace.','Tyre temps in the window, stay smooth.','Watch the crest ahead.','Keep it clean out there.','Maximum attack mode!'];
    this.speak(msgs[Math.floor(Math.random() * msgs.length)]);
  }
}
