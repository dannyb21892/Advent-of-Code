import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(Boolean).join('').split(',');
  let sum = 0;
  lines.forEach(l => {
    let val = 0;
    for(let i = 0; i < l.length; i++){
      val += l.charCodeAt(i);
      val = val*17;
      val = val%256;
    }
    sum += val;
  })
  
  return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(Boolean).join('').split(',').map(x => {
    let operation = x.includes('-') ? '-' : '='
    return {
      operation,
      label: x.split(operation)[0],
      focallength: x.split(operation)[1]
    }
  });
  let boxes = [];
  for(let i = 0; i < 256; i++){
    boxes.push([]);
  }
  lines.forEach(l => {
    let box = 0;
    for(let i = 0; i < l.label.length; i++){
      box += l.label.charCodeAt(i);
      box = box*17;
      box = box%256;
    }
    if(l.operation === '-'){
      boxes[box] = boxes[box].filter(x => x.label !== l.label);
    }
    else {
      let existing = boxes[box].find(x => x.label === l.label);
      if(existing){
        existing.label = l.label;
        existing.focallength = l.focallength;
      }
      else {
        boxes[box].push(l);
      }
    }
  });

  let sum = 0;
  boxes.forEach((box,b) => {
    sum += box.reduce((acc, lens, l) => acc + ((b+1) * (l+1) * (lens.focallength)),0)
  })
  return sum;
}

console.log(problem2(input))
