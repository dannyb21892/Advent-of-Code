import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let key1 = {
    A: 'Z',
    B: 'X',
    C: 'Y',
    X: 'C',
    Y: 'A',
    Z: 'B'
  }

  let key2 = {
    X: 1,
    Y: 2,
    Z: 3,
    A: 1,
    B: 2,
    C: 3
  }
  let total = 0;
  lines.forEach((b) => {
    let points = key2[b[2]];
    if(key1[b[0]] !== b[2]){
      if(key2[b[0]] === points){
        points += 3
      }
      else {
        points += 6
      }
    }
    total += points
  })
  return total
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let points = 0;
  lines.forEach(x => {
    if(x[0] === 'A'){
      if(x[2] === 'X'){
        points += 3;
      }
      else if(x[2] === 'Y'){
        points += 4;
      }
      else {
        points += 8;
      }
    }
    else if(x[0] === 'B'){
      if(x[2] === 'X'){
        points += 1;
      }
      else if(x[2] === 'Y'){
        points += 5;
      }
      else {
        points += 9;
      }
    }
    if(x[0] === 'C'){
      if(x[2] === 'X'){
        points += 2;
      }
      else if(x[2] === 'Y'){
        points += 6;
      }
      else {
        points += 7;
      }
    }
  })
  return points
}

console.log(problem2(input))
