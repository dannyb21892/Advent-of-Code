import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let x = 1;
  let t = 1;
  let ts = [20,60,100,140,180,220];
  let out = 0;
  lines.forEach(l => {
    if(ts.includes(t)){
      out += t*x;
    }
    t += 1;
    if(l !== 'noop'){
      if(ts.includes(t)){
        out += t*x;
      }
      t += 1;
      let val = Number(l.split(' ')[1]);
      x += val;
    }
  })
  return out;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let screen = Array(240).fill('.');
  let x = 1;
  let t = 0;
  lines.forEach(l => {
    screen[t] = Math.abs(t%40-x) <= 1 ? '#' : '.';
    t += 1;
    if(l !== 'noop'){
      screen[t] = Math.abs(t%40-x) <= 1 ? '#' : '.';
      t += 1;
      let val = Number(l.split(' ')[1]);
      x += val;
    }
  })
  let out = ''
  for(let i = 0; i <= 5; i++){
    out += screen.slice(40*i, 40*i + 40).join('') + '\n'
  }
  return out
}

console.log(problem2(input))
