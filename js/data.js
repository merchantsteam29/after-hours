// Patients, night difficulty and phone-call scripts.

export const CREATURES = {
  biscuit: {
    name: 'Biscuit', species: 'Golden Retriever · 6 yrs', room: '1A', kind: 'dog',
    path: ['1A', '4', '5A', 'LD'], door: 'L',
    chart: 'Post-op, left foreleg. Separation anxiety.', likes: 'LOVES the calming music (double effect).',
    death: 'Biscuit just wanted someone to stay with him.',
  },
  mittens: {
    name: 'Mittens', species: 'Domestic Shorthair · 9 yrs', room: '1B', kind: 'cat',
    path: ['1B', '6', 'VENT'], door: 'V',
    chart: 'Infected bite wound. Escapes through vents.', likes: 'HATES music. Food and medicine only.',
    death: 'Mittens came out of the vent.',
  },
  hoppy: {
    name: 'Hoppy', species: 'Flemish Giant Rabbit · 3 yrs', room: '2B', kind: 'rabbit', door: 'R',
    chart: 'Dental surgery. Hides behind the curtain.', likes: 'Very food-motivated (feeding counts double).',
    death: 'Hoppy was always fast.',
  },
  pepper: {
    name: 'Pepper', species: 'African Grey Parrot · 31 yrs', room: '2A', kind: 'parrot',
    chart: 'Feather plucking. Mimics voices.', likes: 'Calms down while you watch her cage camera.',
    death: 'Pepper screamed.',
  },
  ziggy: {
    name: 'Ziggy', species: 'Ferret · 2 yrs', room: '4', kind: 'ferret',
    chart: 'Swallowed a sock (removed). Escape artist. Gets into everything.', likes: 'Bored easily: stress climbs fast. Food and music both work.',
    death: 'Ziggy was in the walls the whole time.',
  },
  stray: {
    name: '???', species: 'Unknown', room: '3', kind: 'stray', notPatient: true,
    paths: [['3', '4', '5A', 'LD'], ['3', '4', '5B', 'RD']],
    death: 'Nobody was watching.',
  },
};
export const PATIENTS = ['biscuit', 'mittens', 'hoppy', 'pepper', 'ziggy'];
export const ALL = ['biscuit', 'mittens', 'hoppy', 'pepper', 'ziggy', 'stray'];
export const OVERTIME = 7; // night number used for Overtime ("Night 6"); 6 is Custom Night

export const NIGHT_LEVELS = {
  1: { biscuit: 3, mittens: 2, hoppy: 0, pepper: 0, stray: 0 },
  2: { biscuit: 5, mittens: 4, hoppy: 3, pepper: 0, stray: 0 },
  3: { biscuit: 6, mittens: 6, hoppy: 5, pepper: 4, stray: 0 },
  4: { biscuit: 8, mittens: 7, hoppy: 7, pepper: 6, stray: 5 },
  5: { biscuit: 11, mittens: 10, hoppy: 10, pepper: 9, stray: 9 },
  7: { biscuit: 8, mittens: 8, hoppy: 7, pepper: 7, ziggy: 9, stray: 8 },
};
// Custom Night challenges: named line-ups, ticked off when beaten
export const CHALLENGES = [
  { id: 'pack', name: 'PACK ANIMALS', note: 'Biscuit and the Stray, flat out', lv: { biscuit: 20, stray: 20 } },
  { id: 'birdcage', name: 'BIRDWATCHING', note: 'Pepper at full volume, Mittens in the vents', lv: { pepper: 20, mittens: 15 } },
  { id: 'runners', name: 'RUNNERS', note: 'Hoppy and Ziggy: you will hear them before you see them', lv: { hoppy: 20, ziggy: 18 } },
  { id: 'skeleton', name: 'SKELETON CREW', note: 'Everyone, a little', lv: { biscuit: 6, mittens: 6, hoppy: 6, pepper: 6, ziggy: 6, stray: 6 } },
];

export const VIALS = { A: { name: 'AMBER', color: '#d6902a' }, B: { name: 'BLUE', color: '#2a6fd6' }, G: { name: 'GREEN', color: '#3fae4a' } };

const HALE = { from: 'Dr. Hale (Day Vet)', pitch: 0.95, rate: 1.05 };
export const CALLS = {
  1: [
    { at: 2, ...HALE, lines: [
      'Hey, hey! You made it. This is Doctor Hale, I run the day shift here at Willowmere.',
      'Quick rundown, because the phone line out here is... not great.',
      'The patients are on the cameras. Monitor is on your desk, hit space. Each one has vitals on screen. Watch the stress.',
      'Feed them, play them the calming music, and give them their medicine. Prescriptions are on the charts by the tray. Mix the vials exactly right.',
      'If a patient gets too stressed, it... gets out. And it will not be itself. It will come looking for the night station.',
      'That is what the doors are for. Light buttons by each door, check the halls. Shut the door if something is there. The vent shutter is on the desk.',
      'Doors eat power, and the generator is all you have until six. So don\'t panic-close.',
      'Once it can\'t get in, it calms down and wanders back to its kennel. Usually.',
      'Okay. Biscuit and Mittens tonight. Easy night. Talk tomorrow!',
    ] },
    { at: 140, from: 'Mrs. Ocampo (Biscuit)', pitch: 1.25, rate: 1.0, lines: [
      'Hi, um, sorry to call so late. This is Biscuit\'s mom.',
      'Is he okay? He hates being alone at night. He gets so scared.',
      'If you play him music he settles right down. He loves it. Please... don\'t let him get lonely.',
    ] },
  ],
  2: [
    { at: 2, ...HALE, lines: [
      'Night two! Great job. Honestly, better than the last guy.',
      'We admitted a rabbit, Hoppy. Exam Room 3, camera 2B. Dental surgery, poor thing.',
      'Here\'s the thing about Hoppy. If he turns, he doesn\'t wander. He waits behind the curtain. He watches the camera.',
      'As long as you keep checking on him, he stays put. If you forget him... he runs. East hall. Right door. Fast.',
      'Oh, and Mittens? Do not play her music. Trust me.',
    ] },
    { at: 120, from: 'Mr. Delacroix (Hoppy)', pitch: 0.9, rate: 1.15, lines: [
      'Hello! Hoppy\'s dad here! Is my boy eating?',
      'He\'s a big eater. Feed him and he\'ll love you forever. Okay. Goodnight!',
    ] },
  ],
  3: [
    { at: 2, ...HALE, lines: [
      'Night three. We have Pepper tonight. African grey, thirty one years old. Very smart. Too smart.',
      'If Pepper gets out, she won\'t come to the doors. She hides in the cameras.',
      'If you see her on a feed, switch away. Do not stare at her. She screams, it blows out the cameras for a while, and it riles up everyone else.',
      'She also copies voices. If the caller ID says UNKNOWN, do not pick up.',
      'When she\'s in her cage though, she likes being watched. Keep an eye on the aviary and she calms right down.',
    ] },
    { at: 160, from: 'Ms. Petrakis (Mittens)', pitch: 1.15, rate: 0.95, lines: [
      'Hello? This is about Mittens. She hasn\'t been herself since the bite.',
      'She doesn\'t purr anymore. Well. She does. But it\'s deeper. Is that normal?',
    ] },
  ],
  4: [
    { at: 2, ...HALE, rate: 0.98, lines: [
      'Okay. Listen. Something came in this afternoon. Animal control dropped it off and left. No chart.',
      'It\'s in Isolation. Camera 3. It doesn\'t eat. It doesn\'t make a sound. I don\'t think it has eyes.',
      'It only moves when nobody is watching it. So watch it. Check camera 3. A lot.',
      'It makes no noise in the halls. If you want to know if it\'s at a door, you have to use the light.',
      'I\'m... going to go home now.',
    ] },
    { at: 190, from: 'Private Number', pitch: 0.6, rate: 0.85, lines: [
      'Hello? Is this the animal hospital? I\'m looking for my dog. He went missing last week.',
      'Brown. Thin. No collar. Someone said animal control picked him up near the woods.',
      'He\'d been sick. Stopped eating. Stopped sleeping. He would just stand in the corner and stare at the wall.',
      'If you see him... don\'t let him in. Please. Just don\'t let him in.',
    ] },
  ],
  5: [
    { at: 2, ...HALE, pitch: 0.85, rate: 0.95, lines: [
      'Hey. It\'s Hale. I\'m recording this in case I\'m not... I\'m not coming in tomorrow.',
      'They know the night station now. All of them. They know your smell.',
      'Everything is faster tonight. Keep them fed. Keep the stray in sight. Don\'t look at the bird. Don\'t answer the bird.',
      'Just get to six. Please. Just get to six.',
    ] },
  ],
  6: [],
  7: [
    { at: 2, from: 'Dr. Reyes (New Day Vet)', pitch: 1.1, rate: 1.0, lines: [
      'Hi. You don\'t know me. I\'m Doctor Reyes, I took over from Doctor Hale.',
      'Nobody else would take the night. I\'m sorry. It\'s one more night, and it pays double.',
      'We have a new one. Ziggy. A ferret. He\'s in a pen in the lobby, camera 4.',
      'Ferrets get into everything. If he gets out, he won\'t use the halls. He\'ll be in the walls.',
      'You won\'t see him coming. Listen. He chitters right before he comes out. Left, right, or the vent. Shut that one. Fast.',
      'Oh, and the generator has been surging. If it does, every door pops open. Close them again.',
    ] },
    { at: 150, from: 'Jules (Ziggy)', pitch: 1.3, rate: 1.15, lines: [
      'Hiii! Is this the place with Ziggy? He is SUCH a menace. I love him so much.',
      'He gets bored, like, instantly. Give him snacks. Play him music. He dances!',
      'If he goes quiet, that is when you worry. Okay bye!',
    ] },
  ],
};

export const FAKE_LINES = [
  ['Hi... is Biscuit okay? Is Biscuit okay? Is Biscuit okay?'],
  ['This is Doctor Hale. Open the doors. Open the doors. It\'s safe now.'],
  ['Pretty bird. Pretty bird. I can see you. I can see you.'],
  ['Don\'t let him get lonely. Lonely. Lonely. Lonely.'],
  ['Talk tomorrow! Talk tomorrow! Talk tomorrow!'],
];

export const OT_ENDING = [
  '6:00 AM. Doctor Reyes lets herself in with a box of donuts and stops in the doorway.',
  'Ziggy is asleep in a sock in his pen. Everyone is in their kennel. Everyone is breathing normally.',
  'She looks at the scratches inside the vent cover for a long time.',
  '"Same time tomorrow?"',
];
export const ENDING = [
  '6:00 AM. The day staff unlock the front doors.',
  'Biscuit is asleep in his kennel, tail thumping. Mittens is purring, the normal way. Hoppy is eating. Pepper says "good morning."',
  'Isolation is empty. The cage door is open.',
  'Nobody saw it leave.',
];
