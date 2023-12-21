import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
import * as helpers from '../../helpers.js'
const filePath = import.meta.url;

getInputforDay(input, filePath);

let rollWest = (lines) => 
  lines.map((line) => {
    let firstRoundRock = line.findIndex(spot => spot === 'O');
    let firstSquareRock = Math.max(...line.slice(0,firstRoundRock).map((spot,i) => spot === '#' ? i : -1));
    let stopAt = firstSquareRock < -1 ? 0 : firstSquareRock + 1;
    line.forEach((rock,i) => {
      if(rock === 'O'){
        line[stopAt] = 'O';
        line[i] = stopAt < i ? '.' : 'O';
        stopAt++;
      }
      else if(rock === '#'){
        stopAt = i + 1;
      }
    });
    return line
  })

const problem = (input) => {
  let lines = helpers.rotateArrayCounterClockwise90(input.split('\n').filter(x=>x).map(line => line.split('')));
  lines = helpers.rotateArrayClockwise90(rollWest(lines));
  return lines.reduce((sum,line,i) => sum + line.filter(x => x === 'O').length * (lines.length - i), 0)
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = helpers.rotateArrayCounterClockwise90(input.split('\n').filter(x=>x).map(line => line.split('')));
  let memoized = {};
  let cycle = 1;
  let repeatPeriod;
  while(true){
    let memo = lines.map(line => line.join('')).join('');
    if(memoized[memo]){
      lines = memoized[memo].lines;
      repeatPeriod = cycle - memoized[memo].cycle;
      if(1000000000%repeatPeriod === cycle%repeatPeriod) break;
    }
    else {
      lines = rollWest(lines);
      lines = rollWest(helpers.rotateArrayClockwise90(lines));
      lines = rollWest(helpers.rotateArrayClockwise90(lines));
      lines = rollWest(helpers.rotateArrayClockwise90(lines));
      lines = helpers.rotateArrayClockwise90(lines);
      memoized[memo] = {lines: lines.map(line => ([...line])), cycle};
    }
    cycle++;
  }
  lines = helpers.rotateArrayClockwise90(lines);
  return lines.reduce((sum,line,i) => sum + line.filter(x => x === 'O').length * (lines.length - i), 0)
}

console.log(problem2(input))
