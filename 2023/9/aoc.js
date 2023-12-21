import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => x.split(' ').map(Number));
  let sum = 0;
  lines.forEach((l) => {
    let alldiffs = [];
    let done = false;
    let current = l;
    while(!done){
      let diffs = []
      current.forEach((x, i) => {
        if(i < current.length - 1){
          diffs.push(current[i+1] - x);
        }
      })
      if(diffs.every(x => x === 0)){
        done = true;
      }
      alldiffs.unshift([...diffs].reverse())
      current = diffs;
    }
    let nonzerodiffs = alldiffs.slice(1);
    nonzerodiffs.forEach((diff, i) => {
      let add = i === 0 ? 0 : nonzerodiffs[i-1][0];
      diff.unshift(diff[0] + add);
    });
    let add = nonzerodiffs.slice(-1)[0][0] + l.slice(-1)[0];
    sum += add;
  })
  return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => x.split(' ').map(Number));
  let sum = 0;
  lines.forEach((l) => {
    let alldiffs = [];
    let done = false;
    let current = l;
    while(!done){
      let diffs = []
      current.forEach((x, i) => {
        if(i < current.length - 1){
          diffs.push(current[i+1] - x);
        }
      })
      if(diffs.every(x => x === 0)){
        done = true;
      }
      alldiffs.unshift(diffs)
      current = diffs;
    }
    let nonzerodiffs = alldiffs.slice(1);
    nonzerodiffs.forEach((diff, i) => {
      let subtract = i === 0 ? 0 : nonzerodiffs[i-1][0];
      diff.unshift(diff[0] - subtract);
    });
    console.log(nonzerodiffs)
    let add = l[0] - nonzerodiffs.slice(-1)[0][0];
    console.log(add)
    sum += add;
  })
  return sum
}

console.log(problem2(input))
