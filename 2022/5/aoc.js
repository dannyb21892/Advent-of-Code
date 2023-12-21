import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let moves = input.split('\n\n').filter(x=>x)[1].split('\n').filter(x=>x);
  let crates = [
    'SLW',
    'JTNQ',
    'SCHFJ',
    'TRMWNGB',
    'TRLSDHQB',
    'MJBVFHRL',
    'DWRNJM',
    'BZTFHNDJ',
    'HLQNBFT'
  ];
  crates = crates.map(x => x.split(''));
  moves.forEach(x => {
    let num = Number(x.split(' ')[1]);
    let from = Number(x.split(' ')[3]) - 1;
    let to = Number(x.split(' ')[5]) - 1;
    for(let y = 1; y <= num; y++){
      crates[to].push(crates[from].pop());
    }
  })
  let out = '';
  crates.forEach(c => {
    out += c.reverse()[0];
  })
  return out
}

console.log(problem(input))

const problem2 = (input) => {
  let moves = input.split('\n\n').filter(x=>x)[1].split('\n').filter(x=>x);
  let crates = [
    'SLW',
    'JTNQ',
    'SCHFJ',
    'TRMWNGB',
    'TRLSDHQB',
    'MJBVFHRL',
    'DWRNJM',
    'BZTFHNDJ',
    'HLQNBFT'
  ];
  crates = crates.map(x => x.split(''));
  moves.forEach(x => {
    let num = Number(x.split(' ')[1]);
    let from = Number(x.split(' ')[3]) - 1;
    let to = Number(x.split(' ')[5]) - 1;
    crates[to] = [...crates[to], ...crates[from].splice(num*(-1))]
  })
  let out = '';
  crates.forEach(c => {
    out += c.reverse()[0];
  })
  return out
}

console.log(problem2(input))
