import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n\n').map(x => x.split('\n').map(Number));
  return Math.max(...lines.map(x => x.reduce((a,b) => a+b)))

}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n\n').map(x => x.split('\n').map(Number));
  let out = lines.map(x => x.reduce((a,b) => a+b)).sort((a,b) => b-a);
  return out[0]+out[1]+out[2]

}

console.log(problem2(input))
