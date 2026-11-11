// Phone playtest: touch controls (drag to look, the bottom button row, tap the phone box), on a phone-sized screen.
import { open } from './harness.mjs';
const { ev, shot, sleep, check, done, send } = await open(import.meta.url, { mobile: true });
await sleep(4000);
await shot('00-menu');
check(true === await ev(`return document.body.classList.contains('is-touch')`), 'touch mode on a phone');
await ev(`__wah.start(1); __wah.freeze(true); return 1`);
await sleep(1500);
await shot('01-office');
check(true === await ev(`const r=document.getElementById('touchRow'); return getComputedStyle(r).display==='flex' && r.getBoundingClientRect().bottom <= innerHeight`), 'button row shows on screen');
// tap the left door button
await ev(`document.querySelector('#touchRow [data-t=doorL]').click(); return 1`);
check(true === await ev(`return __wah.G ? __wah.G.doors.L : document.querySelector('#touchRow [data-t=doorL]').classList.contains('on')`), 'tap closes the left door');
// drag right to look (touch-type pointer events, as a phone sends them), then a short tap
const drag = (x0, x1) => ev(`const c=document.querySelector('canvas'), P=(t,x,el)=>(el||window).dispatchEvent(new PointerEvent(t,{pointerType:'touch',pointerId:7,clientX:x,clientY:180,bubbles:true}));
  P('pointerdown',${x0},c); for(let x=${x0};x<=${x1};x+=20) P('pointermove',x); P('pointerup',${x1}); return 1`);
const y0 = await ev(`return __wah.yaw`);
await drag(300, 600); await sleep(200);
await shot('02-looked');
const y1 = await ev(`return __wah.yaw`);
check(y1 !== y0, 'dragging turns the view');
await drag(700, 702); // a tap near the right edge: with a mouse that spot would keep turning the view
const y2 = await ev(`return __wah.yaw`); await sleep(800); const y3 = await ev(`return __wah.yaw`);
check(Math.abs(y3 - y2) < 0.01, 'view stays still after a tap');
await ev(`document.getElementById('camBar').click(); return 1`); await sleep(600);
await shot('03-cams');
check(true === await ev(`return !document.getElementById('camUI').classList.contains('hidden')`), 'camera bar works by tap');
await ev(`document.getElementById('camClose').click(); return 1`); await sleep(400);
await ev(`document.getElementById('tPause').click(); return 1`);
check(true === await ev(`return !document.getElementById('pause').classList.contains('hidden')`), 'pause button');
await done();
