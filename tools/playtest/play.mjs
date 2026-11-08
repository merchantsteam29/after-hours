// Smoke playtest: menu, office views, every camera, monsters at doors, meds, phone, jumpscare, win.
import { open } from './harness.mjs';
const { ev, shot, sleep, check, done } = await open(import.meta.url);
await sleep(4000);
await shot('00-menu');
await ev(`__wah.start(1); __wah.freeze(true); return 1`);
await sleep(800);
check(await ev(`return __wah.mode`) === 'play', 'night starts');
await shot('01-office');
await ev(`__wah.setYaw(1.05)`); await sleep(300); await shot('02-left');
await ev(`__wah.setYaw(-1.05)`); await sleep(300); await shot('03-right');
await ev(`__wah.setYaw(-0.3)`); await sleep(300); await shot('04-vent');
// night 5 so every patient is admitted
await ev(`__wah.start(5); __wah.freeze(true); return 1`); await sleep(600);
await ev(`__wah.raiseCams()`); await sleep(300);
for (const id of ['1A', '1B', '2A', '2B', '3', '4', '5A', '5B', '6']) { await ev(`__wah.selectCam('${id}')`); await sleep(900); await shot('cam-' + id); }
// turned monsters on cameras
await ev(`const G = __wah.G; for (const id of ['biscuit','mittens','hoppy']) __wah.turn(id); G.cr.stray.loc='4'; return 1;`);
await ev(`__wah.selectCam('1A')`); await sleep(900); await shot('m-1A-biscuit');
await ev(`__wah.selectCam('1B')`); await sleep(900); await shot('m-1B-mittens');
await ev(`__wah.selectCam('2B')`); await sleep(900); await shot('m-2B-hoppy0');
await ev(`__wah.G.cr.hoppy.stage=2`); await sleep(500); await shot('m-2B-hoppy2');
await ev(`__wah.selectCam('4')`); await sleep(900); await shot('m-4-stray');
await ev(`const c=__wah.G.cr.mittens; c.loc='6'; __wah.selectCam('6')`); await sleep(900); await shot('m-6-mittens');
await ev(`const c=__wah.G.cr.pepper; c.state='perch'; c.loc='5A'; c.turnedT=0; __wah.selectCam('5A')`); await sleep(700); await shot('m-5A-pepper');
await ev(`__wah.selectCam('3')`); await sleep(400);
await ev(`__wah.lowerCams()`); await sleep(300);
// at the doors
await ev(`const G=__wah.G; G.cr.biscuit.loc='LD'; G.cr.biscuit.atDoorT=999; G.cr.hoppy.loc='RD'; G.cr.hoppy.atDoorT=999; G.cr.mittens.loc='VENT'; G.cr.mittens.atDoorT=999; G.cr.pepper.state='patient'; G.cr.stray.loc='3'; return 1;`);
await ev(`__wah.setYaw(1.05); __wah.toggleLight('L')`); await sleep(500); await shot('d-left-lit');
await ev(`__wah.toggleLight('L'); __wah.toggleDoor('L')`); await sleep(600); await shot('d-left-closed');
await ev(`__wah.setYaw(-1.05); __wah.toggleLight('R')`); await sleep(500); await shot('d-right-lit');
await ev(`__wah.setYaw(-0.3)`); await sleep(500); await shot('d-vent');
// meds
await ev(`__wah.openMeds(); __wah.addVial('A')`); await sleep(700); await ev(`__wah.addVial('B')`); await sleep(700); await shot('meds');
await ev(`__wah.closeMeds()`);
// phone
await ev(`__wah.start(1); __wah.freeze(true); return 1`); await sleep(300); await ev(`__wah.step(3)`); await sleep(200);
check(await ev(`return __wah.G.phone.state`) === 'ringing', 'phone rings on night 1');
await ev(`__wah.answerPhone()`); await sleep(400); await shot('phone');
// power out & jumpscare
await ev(`__wah.kill('biscuit')`); await sleep(150); await shot('jump-biscuit');
await sleep(2000); await shot('gameover');
check(await ev(`return __wah.mode`) === 'over', 'game over shown');
await ev(`__wah.start(4); __wah.freeze(true); return 1`); await sleep(300); await ev(`__wah.kill('stray')`); await sleep(160); await shot('jump-stray');
await sleep(1800);
await ev(`__wah.start(3); __wah.freeze(true); return 1`); await sleep(300); await ev(`__wah.kill('hoppy')`); await sleep(160); await shot('jump-hoppy');
await sleep(1800);
await ev(`__wah.start(2); __wah.freeze(true); return 1`); await sleep(300); await ev(`__wah.kill('mittens')`); await sleep(160); await shot('jump-mittens');
await sleep(1800);
// win
await ev(`__wah.start(2); __wah.freeze(true); return 1`); await sleep(300); await ev(`__wah.G.t = 299.9; return 1`); await sleep(2000);
check(await ev(`return __wah.mode`) === 'won', 'reaching 6 AM wins');
await sleep(4500); await shot('win');
// simulate a whole night with AI running and nobody playing: should die, not crash
await ev(`__wah.start(5); __wah.freeze(false); return 1`); await sleep(300);
await ev(`__wah.step(300); return __wah.mode`);
console.log('idle night 5 ->', await ev(`return __wah.mode + ' killer=' + __wah.G.killer + ' t=' + __wah.G.t.toFixed(0)`));
await done();
