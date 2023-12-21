import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => x.split(':')[1].split(' ').filter(Boolean).map(Number));
  let time = lines[0];
  let dist = lines[1];
  let out = 1;
  time.forEach((t,i)=> {
    let d = dist[i];
    let num = 0;
    for(let held = Math.floor(t/2); held > 0; held--){
      if((t-held)*held > d) num++;
    }
    out = out * ((num - (t%2 ? 0 : 1)) * 2 + (t%2 ? 0 : 1));
  })
  return out;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => Number(x.split(':')[1].split(' ').filter(Boolean).join('')));
  let t = lines[0];
  let d = lines[1];
  let num = 0;
  for(let held = Math.floor(t/2); held > 0; held--){
    if((t-held)*held > d) num++;
  }
  return (num - (t%2 ? 0 : 1)) * 2 + (t%2 ? 0 : 1);
}

console.log(problem2(input))
