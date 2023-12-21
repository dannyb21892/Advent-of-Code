import { input, test, input2 } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let packets = input.split('\n\n').filter(x=>x).map(x => x.split('\n').map(eval));
  let output = 0;
  packets.forEach((p, pi) => {if(compare(p[0], p[1]) === 1) output += pi + 1})
  return output
}

const problem2 = (input) => {
  let packets = input.split('\n').filter(x=>x).map(eval);
  let done = false;
  while(!done){
    done = true;
    for(let i = 0; i < packets.length - 1; i++){
      let c = compare(packets[i], packets[i+1]);
      if(c === -1){
        done = false;
        packets = [...packets.slice(0,i), packets[i+1], packets[i], ...packets.slice(i+2)];
      }
    }
  }
  return (packets.findIndex(p => JSON.stringify(p) === '[[2]]') + 1) * (packets.findIndex(p => JSON.stringify(p) === '[[6]]') + 1)
}

const compare = (left, right) => {
  if(typeof left === 'number' && typeof right === 'number'){
    return left < right ? 1 : (left === right ? 0 : -1);
  }
  else if(typeof left !== typeof right){
    left = typeof left === 'number' ? [left] : left;
    right = typeof right === 'number' ? [right] : right;
    return compare(left, right)
  }
  else {
    let i = -1;
    let test = 0;
    while(left[i+1] !== undefined && right[i+1] !== undefined && test === 0){
      i++;
      test = compare(left[i], right[i]);
    }
    if(test){return test}
    else if(left[i+1] === undefined && right[i+1] !== undefined){return 1}
    else if(right[i+1] === undefined && left[i+1] !== undefined){return -1}
    else if (test === 0 || (left[i+1] === undefined && right[i+1] === undefined)){return 0}
  }
}

console.log(problem(input))
console.log(problem2(input2))
