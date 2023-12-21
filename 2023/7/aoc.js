import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

let rank = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
let rank2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => ({hand: x.split(' ')[0].split(''), bid: Number(x.split(' ')[1])}));
  let fivekind = [];
  let fourkind = [];
  let fullhouse = [];
  let threekind = [];
  let twopair = [];
  let onepair = [];
  let highcard = [];
  lines.filter(l => {
    let freqs = {};
    l.hand.forEach(c => freqs[c] = (freqs[c] || 0) + 1);
    let freqvals = Object.values(freqs).sort();
    if(freqvals[0] === 5) fivekind.push(l)
    else if(freqvals[0] === 1 && freqvals[1] === 4) fourkind.push(l)
    else if(freqvals[0] === 2 && freqvals[1] === 3) fullhouse.push(l)
    else if(freqvals[0] === 1 && freqvals[1] === 1 && freqvals[2] === 3) threekind.push(l)
    else if(freqvals[0] === 1 && freqvals[1] === 2 && freqvals[2] === 2) twopair.push(l)
    else if(freqvals[0] === 1 && freqvals[1] === 1 && freqvals[2] === 1 && freqvals[3] === 2) onepair.push(l)
    else highcard.push(l);

  });

  let order = [];
  [highcard, onepair, twopair, threekind, fullhouse, fourkind, fivekind]
    .forEach(section => order = [...order, ...section.sort(sorthands)])

  let out = 0;
  order.forEach((x, i) => out += x.bid*(i + 1));
  return out;
}

let scorehands = (l) => {
  let freqs = {};
  l.hand.forEach(c => freqs[c] = (freqs[c] || 0) + 1);
  let freqvals = Object.values(freqs).sort();
  return freqvals[0] === 5;
}

let sorthands = (a,b) => {
  let sort;
  for(let ind = 0; ind < 5; ind++){
    sort = rank.findIndex(r => r === a.hand[ind]) - rank.findIndex(r => r === b.hand[ind]);
    if(sort) break;
  }
  return sort;
}

let sorthands2 = (a,b) => {
  let sort;
  for(let ind = 0; ind < 5; ind++){
    sort = rank2.findIndex(r => r === a.hand[ind]) - rank2.findIndex(r => r === b.hand[ind]);
    if(sort) break;
  }
  return sort;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => ({hand: x.split(' ')[0].split(''), bid: Number(x.split(' ')[1])}));
  let fivekind = [];
  let fourkind = [];
  let fullhouse = [];
  let threekind = [];
  let twopair = [];
  let onepair = [];
  let highcard = [];
  lines.filter(l => {
    let freqs = {};
    let j = 0;
    l.hand.forEach(c => {
      if(c === 'J'){
        j++;
      }
      else {
        freqs[c] = (freqs[c] || 0) + 1
      }
    });
    let freqvals = Object.entries(freqs).sort((a,b) => b[1] - a[1]);
    if(!freqvals.length){
      freqvals = [['J', 0]]
    }
    freqvals[0][1] = freqvals[0][1] + j;
    if(freqvals[0][1] === 5) fivekind.push(l)
    else if(freqvals[0][1] === 4 && freqvals[1][1] === 1) fourkind.push(l)
    else if(freqvals[0][1] === 3 && freqvals[1][1] === 2) fullhouse.push(l)
    else if(freqvals[0][1] === 3 && freqvals[1][1] === 1 && freqvals[2][1] === 1) threekind.push(l)
    else if(freqvals[0][1] === 2 && freqvals[1][1] === 2 && freqvals[2][1] === 1) twopair.push(l)
    else if(freqvals[0][1] === 2 && freqvals[1][1] === 1 && freqvals[2][1] === 1 && freqvals[3][1] === 1) onepair.push(l)
    else highcard.push(l);
  });

  let order = [];
  [highcard, onepair, twopair, threekind, fullhouse, fourkind, fivekind]
    .forEach(section => order = [...order, ...section.sort(sorthands2)])

  let out = 0;
  order.forEach((x, i) => out += x.bid*(i + 1));
  return out;
}

console.log(problem2(input))
