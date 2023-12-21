import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => {
    return {
      val: Number(x),
      next: null,
      prev: null
    }
  });
  let len = lines.length
  lines.forEach((l, i) => {
    l.next = lines[i+1 === len ? 0 : i+1];
    l.prev = lines[i === 0 ? len-1 : i-1]
  });

  lines.forEach((num) => {
    if((num.val%(len-1)) !== 0){
      let newSpot = num;
      if(num.val > 0){
        for(let x = 1; x <= (num.val%(len-1)); x++){
          newSpot = newSpot.next;
          if(newSpot === num){
            newSpot = newSpot.next;
          }
        }
        num.prev.next = num.next;
        num.next.prev = num.prev;
        num.next = newSpot.next;
        newSpot.next.prev = num;
        newSpot.next = num;
        num.prev = newSpot;
      }
      else {
        for(let x = -1; x >= (num.val%(len-1)); x--){
          newSpot = newSpot.prev;
          if(newSpot === num){
            newSpot = newSpot.prev;
          }
        }
        num.prev.next = num.next;
        num.next.prev = num.prev;
        num.prev = newSpot.prev;
        newSpot.prev.next = num;
        newSpot.prev = num;
        num.next = newSpot;
      }
      //console.log(lines)
    }
  });
  let zero = lines.find(x => x.val === 0);
  let sum = 0;
  for(let x = 1; x <= 3000; x++){
    zero = zero.next;
    if(x%1000 === 0){
      sum += zero.val;
    }
  }
  return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => {
    return {
      val: Number(x)*811589153,
      next: null,
      prev: null
    }
  });
  let len = lines.length
  lines.forEach((l, i) => {
    l.next = lines[i+1 === len ? 0 : i+1];
    l.prev = lines[i === 0 ? len-1 : i-1]
  });
  for(let ii = 0; ii < 10; ii++){
    lines.forEach((num) => {
      if((num.val%(len-1)) !== 0){
        let newSpot = num;
        if(num.val > 0){
          for(let x = 1; x <= (num.val%(len-1)); x++){
            newSpot = newSpot.next;
            if(newSpot === num){
              newSpot = newSpot.next;
            }
          }
          num.prev.next = num.next;
          num.next.prev = num.prev;
          num.next = newSpot.next;
          newSpot.next.prev = num;
          newSpot.next = num;
          num.prev = newSpot;
        }
        else {
          for(let x = -1; x >= (num.val%(len-1)); x--){
            newSpot = newSpot.prev;
            if(newSpot === num){
              newSpot = newSpot.prev;
            }
          }
          num.prev.next = num.next;
          num.next.prev = num.prev;
          num.prev = newSpot.prev;
          newSpot.prev.next = num;
          newSpot.prev = num;
          num.next = newSpot;
        }
      }
    });
  }

  let zero = lines.find(x => x.val === 0);
  let sum = 0;
  for(let x = 1; x <= 3000; x++){
    zero = zero.next;
    if(x%1000 === 0){
      sum += zero.val;
    }
  }
  return sum
}

console.log(problem2(input))
