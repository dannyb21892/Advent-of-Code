import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let sections = input.split('\n\n').filter(x=>x).map(x => x.split('\n'));
  let seeds = sections[0][0].split('seeds: ')[1].split(' ').map(Number);
  let maps = sections.slice(1).map(x => x.slice(1).map(y => y.split(' ').map(Number)));
  let minLocation = Infinity
  seeds.forEach(s => {
    let current = s;
    for(let m of maps){
      let match = m.find(row => current >= row[1] && current < row[1] + row[2]);
      if(match){
        current = match[0] + current - match[1];
      }
    }
    minLocation = Math.min(minLocation, current);
  })
  return minLocation
}

console.log(problem(input))

const problem2 = (input) => {
  let sections = input.split('\n\n').filter(x=>x).map(x => x.split('\n'));
  let seedRanges = sections[0][0].split('seeds: ')[1].split(' ').map(Number);
  let seedPairs = [];
  for(let i = 0; i < seedRanges.length; i = i+2){
    seedPairs.push({min: seedRanges[i], max: seedRanges[i] + seedRanges[i+1] - 1});//[seedRanges[i], seedRanges[i+1]])
  }
  let maps = sections.slice(1).map(x => x.slice(1).map(y => y.split(' ').map(Number))).reverse();
  let loc = 0;
  while(true){
    loc++;
    let current = loc;
    for(let m of maps){
      let match = m.find(row => row[0] <= current && row[0] + row[2] > current);
      if(match){
        current = match[1] + current - match[0];
      }
    }
    if(seedPairs.find(pair => current >= pair.min && current <= pair.max)){
      break;
    }
  }
  return loc
}

console.log(problem2(input))
