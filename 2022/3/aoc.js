import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let sacks = lines.map(x => {
    return [
      x.slice(0,Math.ceil(x.length/2)).split(''),
      x.slice(Math.ceil(x.length/2)).split('')
    ]
  });
  let both = sacks.map(x => {
    let l = x[0].find(a => x[1].includes(a));
    if(l.charCodeAt(0) >= 97){
      return l.charCodeAt(0) - 96
    }
    else {
      return l.charCodeAt(0) - 64 + 26
    }
  });
  console.log(both)
  return both.reduce((a,b) => a+b)
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => x.split(''));
  let x = 0;
  let sum = 0
  while(x+2 < lines.length){
    let l = lines[x].find(a => lines[x+1].includes(a) && lines[x+2].includes(a))
    if(l.charCodeAt(0) >= 97){
      sum += l.charCodeAt(0) - 96
    }
    else {
      sum += l.charCodeAt(0) - 64 + 26
    }
    x += 3
  }
  return sum
}

console.log(problem2(input))
