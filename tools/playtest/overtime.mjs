// Overtime ("Night 6"): Ziggy in the lobby, turning, darting out of the walls (blocked, then let through),
// the power surge, the win screen's stars, and the Nights / Patient files / Custom Night challenge screens.
import { open } from './harness.mjs';
const { ev, shot, sleep, check, done } = await open(import.meta.url);
await sleep(4000);
await ev(`localStorage.setItem('willowmere_after_hours_v1', JSON.stringify({ night: 5, beat: true })); location.reload(); return 1`);
await sleep(4000);
check(true === await ev(`return !document.getElementById('otBtn').classList.contains('hidden')`), 'Overtime unlocked after beating night 5');
await shot('00-menu');
await ev(`document.getElementById('otBtn').click(); return 1`); await sleep(800);
check(true === await ev(`return __wah.G.night === 7 && __wah.G.cr.ziggy.level > 0`), 'Overtime starts with Ziggy');
await ev(`__wah.freeze(true); __wah.raiseCams(); __wah.selectCam('4'); return 1`); await sleep(600);
await shot('01-lobby-ziggy');
check(true === await ev(`return document.getElementById('patient').textContent.includes('Ziggy')`), 'Ziggy has a care panel on camera 4');
await ev(`__wah.lowerCams(); return 1`);
// turn Ziggy and step the AI by hand (the rest stay frozen)
await ev(`const z=__wah.G.cr.ziggy; z.stress=100; for (const id in __wah.G.cr) if (id!=='ziggy') __wah.G.cr[id].level=0, __wah.G.cr[id].state='absent'; __wah.freeze(false); __wah.step(0.1); return 1`);
await sleep(300);
check(await ev(`return __wah.G.cr.ziggy.state`) === 'walls', 'Ziggy goes into the walls');
const dart = await ev(`const z=__wah.G.cr.ziggy; z.dartT=0; __wah.step(0.05); return z.dart && z.dart.door`);
check(["L","R","V"].includes(dart), 'Ziggy picks a door to dart at: ' + dart);
await ev(`__wah.toggleDoor(${JSON.stringify(dart)}); __wah.step(3); return 1`);
check(true === await ev(`return __wah.mode === 'play' && __wah.G.cr.ziggy.tries === 1`), 'a shut door blocks the dart');
// the surge
await ev(`__wah.G.surgeT = __wah.G.t + 0.01; __wah.step(0.1); return 1`);
check(true === await ev(`const d=__wah.G.doors; return !d.L && !d.R && !d.V && __wah.G.camLost > 0`), 'the power surge opens every door');
// now let one through
await ev(`const z=__wah.G.cr.ziggy; z.dartT=0; __wah.step(0.05); __wah.step(3.5); return 1`);
await sleep(500);
await shot('02-jumpscare');
check(true === await ev(`return __wah.mode === 'dying' || __wah.mode === 'over'`), 'an open door gets you');
await sleep(2500);
check(true === await ev(`return JSON.parse(localStorage.getItem('willowmere_after_hours_v1')).files.ziggy.kills >= 1`), 'the file counts the death');
// a win: stars
await ev(`document.querySelector('[data-act=menu]').click(); return 1`); await sleep(500);
await ev(`__wah.start(2); __wah.freeze(true); return 1`); await sleep(800);
await ev(`__wah.G.t = 50 * 6 - 0.05; __wah.step(0.2); return 1`); await sleep(800);
await shot('03-win-stars');
check(true === await ev(`return (JSON.parse(localStorage.getItem('willowmere_after_hours_v1')).nightStars || {})[2] >= 2`), 'winning records stars for the night');
await ev(`document.querySelector('#win [data-act=menu]').click(); return 1`); await sleep(500);
await ev(`document.getElementById('nightsBtn').click(); return 1`); await sleep(300);
await shot('04-nights');
check(true === await ev(`return document.querySelectorAll('#nightList .nRow').length >= 6`), 'night select lists nights 1-5 and Overtime');
await ev(`document.querySelector('#nights [data-act=menu]').click(); document.querySelector('[data-act=files]').click(); return 1`); await sleep(300);
await shot('05-files');
check(true === await ev(`return document.querySelectorAll('#fileList .file:not(.locked)').length >= 2`), 'patient files show the patients you met');
await ev(`document.querySelector('#files [data-act=menu]').click(); document.getElementById('customBtn').click(); return 1`); await sleep(300);
await ev(`document.querySelector('#chList [data-ch=runners]').click(); return 1`);
check(true === await ev(`return document.getElementById('cv_ziggy').textContent === '18'`), 'a challenge sets the Custom Night line-up');
await shot('06-custom');
await done();
