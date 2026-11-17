const ENCOUNTERS = Object.freeze({
  BREACH: {
    signature: ['charger', 'chaser'],
    weights: { chaser: 3, charger: 3, shooter: 1, strafer: 1 },
    brief: '敵編成は突進型・追跡型中心。接近される前に塊を割れ。'
  },
  SNIPER: {
    signature: ['shooter', 'strafer'],
    weights: { chaser: 1, charger: 1, shooter: 3, strafer: 3 },
    brief: '射撃型・周回型中心。長い射線に立ち止まるな。'
  },
  CROSSING: {
    signature: ['charger', 'strafer'],
    weights: { chaser: 2, charger: 3, shooter: 1, strafer: 2 },
    brief: '突進型・周回型が横断路を挟む。斜めに移動し包囲を割れ。'
  },
  COLOSSUS: {
    signature: ['strafer', 'shooter'],
    weights: { chaser: 1, charger: 1, shooter: 3, strafer: 3 },
    brief: '周回型・射撃型中心。外周を走り、遠距離の敵から崩せ。'
  },
  VERTIGO: {
    signature: ['strafer', 'charger'],
    weights: { chaser: 1, charger: 2, shooter: 2, strafer: 3 },
    brief: '浮遊型・突進型中心。高低差で照準と追跡経路を切れ。'
  }
});

const FALLBACK = ENCOUNTERS.COLOSSUS;

export function omegaEncounterBrief(arenaForm) {
  return (ENCOUNTERS[arenaForm] || FALLBACK).brief;
}

function weightedEnemy(profile, random) {
  const entries = Object.entries(profile.weights);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let target = Math.max(0, Math.min(.999999999, random())) * total;
  for (const [enemy, weight] of entries) {
    target -= weight;
    if (target < 0) return enemy;
  }
  return entries[entries.length - 1][0];
}

function shuffle(items, random) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function composeOmegaEncounter(arenaForm, count, random = Math.random) {
  const size = Math.max(0, Math.floor(count));
  if (!size) return [];
  const profile = ENCOUNTERS[arenaForm] || FALLBACK;
  const roster = profile.signature.slice(0, size);
  while (roster.length < size) roster.push(weightedEnemy(profile, random));
  return shuffle(roster, random);
}

export function remixOmegaQueue(arenaForm, queue, random = Math.random) {
  const pending = Array.isArray(queue) ? queue : [];
  const bossCount = pending.filter(enemy => enemy === 'boss').length;
  const regularCount = pending.length - bossCount;
  return [
    ...Array(bossCount).fill('boss'),
    ...composeOmegaEncounter(arenaForm, regularCount, random)
  ];
}

// Σ keeps the same world objectives and weapon roulette as Ω, but combat is
// deliberately close-range. A full opening wave gets one readable shooter
// so the kinetic counter has a purpose; refills are melee-only.
export function composeFractureEncounter(count, random = Math.random, includeShooter = true) {
  const size = Math.max(0, Math.floor(count));
  if (!size) return [];
  const hasShooter = includeShooter && size >= 4;
  const roster = [];
  const meleeCount = size - (hasShooter ? 1 : 0);
  for (let i = 0; i < meleeCount; i++) roster.push(random() < .5 ? 'chaser' : 'charger');
  if (hasShooter) roster.push('shooter');
  return shuffle(roster, random);
}

export function remixFractureQueue(queue, random = Math.random) {
  const pending = Array.isArray(queue) ? queue : [];
  const bossCount = pending.filter(enemy => enemy === 'boss').length;
  const regularCount = pending.length - bossCount;
  return [
    ...Array(bossCount).fill('boss'),
    ...composeFractureEncounter(regularCount, random, true)
  ];
}
