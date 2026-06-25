# APEX RACER X — How to Run

## Play Instantly
Open `index.html` in Chrome or Edge. No install, no server needed.
Double-click the file or drag it into your browser.

## Controls
| Key | Action |
|---|---|
| → / W | Throttle / Accelerate |
| ← / S | Brake |
| SPACE | Boost / Jump |
| ESC or P | Pause game |

## Screens
1. Home Page — scroll to read about the game, click START RACING
2. Level Select — choose 1 of 10 stages, ⌂ BACK TO HOME button at bottom
3. Race — drive to the finish line, AI crew chief speaks live
4. Pause Menu (ESC) — resume, volume sliders, sound toggle, restart, home
5. Result — star rating, finish time, AI voiced debrief

## Multiplayer
Click ⚡ MULTIPLAYER during a race:
- HOST RACE → get a room code (e.g. APEX-WOLF-427)
- Share code with friend → they click JOIN RACE → paste code → connect
- Both see each other as a live coloured car

## Ghost Racing
Your best run per level is saved to localStorage and the URL hash.
Share the URL to let friends race against your ghost.

## AI Crew Chief
Requires internet connection. Streams live tactical advice via Claude API.
Speaks aloud via Web Speech API (best in Chrome/Edge).

## Unit Tests
cd apex_racer_x && npm install && npm test

## Browser Requirements
Chrome 80+ or Edge 80+ recommended for full Web Speech API support.
Firefox/Safari work but voice may be silent.
