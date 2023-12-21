import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n')
  .filter(x=>x).map(
    x => x.split('')
    .filter(y => ['1','2','3','4','5','6','7','8','9','0'].includes(y))
  ).map(x => x.length ? Number(x[0] + x.slice(-1)[0]) : 0).reduce((a,b) => a + b,0)
  return lines
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n');
  let sum = 0;
  lines.map(x => {
    //console.log('at line ', x)
    let nums = ['1','2','3','4','5','6','7','8','9','0'];
    let numsstr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let min = Infinity;
    let first = 0;
    let max = -1;
    let last = 0;
    x.split('').forEach((y,i) => {
      if(nums.includes(y) && i < min){
        min = i;
        first = Number(y);
      }
      if(nums.includes(y) && i > max){
        max = i;
        last = Number(y);
      }
    })
    numsstr.forEach((n, ni) => {
      //console.log('at num ', n)
      x.split('').forEach((y,i) => {
        //console.log('at char', y,i,x.slice(i,i+n.length))
        if(x.slice(i,i+n.length) === n && i < min){
          min = i;
          first = ni;
          //console.log('new first ', ni)
        }
        if(x.slice(i,i+n.length) === n && i > max){
          max = i;
          last = ni;
          //console.log('new last ', ni)
        }
      })
    });
    let out = (10*first) + last;
    sum += out
  })
  return sum
}

console.log(problem2(input))
