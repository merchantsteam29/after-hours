# Willowmere After Hours

Night-shift horror at an animal hospital. You sit at the night station with two doors, two hall lights, a vent shutter and a CCTV monitor. Keep the patients calm, or they turn and come for you. Survive from 12 AM to 6 AM.

Plain HTML + ES modules + Three.js 0.160 (CDN import map). No build step, no asset files: models are procedural and all audio is WebAudio-synthesized. Phone calls use the browser's speech voices.

```
node serve.js        # http://localhost:8080
```

## Controls
| Key | Action |
| --- | --- |
| Mouse to screen edge / ← → | Look left / right |
| Q / E | Left / right door |
| A / D | Left / right hall light |
| W | Vent shutter |
| Space (or hover the bottom bar) | Raise / lower the camera monitor |
| 1–9 | Switch camera (monitor up) |
| F / R / T | Feed / calming music / give medicine (on a patient's camera) |
| M | Medication station: 1 2 3 add vials, Enter loads the syringe |
| P | Answer / hang up the phone |
| Esc | Pause |

## Patients
- **Biscuit** (dog, Dog Ward 1A): walks Lobby, then West Hall, then the left door. Breathes heavily at the door. Loves the music.
- **Mittens** (cat, Cattery 1B): crawls through the Vent Duct to your vent. Purrs. Hates the music.
- **Hoppy** (rabbit, Exam Room 3, 2B): when turned, waits behind the curtain and advances only while you're not watching cam 2B, then sprints down the East Hall to the right door. Food counts double.
- **Pepper** (parrot, Aviary 2A): when turned, she hides in a random camera. Stare at her for more than about 1.5 s and she screams: cameras go down, you lose power, and everyone else gets more stressed. She also makes fake UNKNOWN calls, so don't answer them. Watching her cage keeps her calm.
- **The Stray** (Isolation 3, nights 4+): not a patient. It moves only while nobody is watching its camera, and it makes no sound. Use the lights.

Nights 1–5 add patients and speed. Beating night 5 unlocks Custom Night (0–20 per creature). Progress is saved in localStorage.

## Playtest
`node tools/playtest/play.mjs` (needs Node 22+ and Chrome; set `WAH_URL` if the server isn't on :8080). The game exposes `window.__wah` when loaded with `?test`. Screenshots go to `tools/playtest/shots/`.
