import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => x.split(''));
  let sum = 0;
  lines.forEach((line, li) => {
    let num = '';
    let start = null;
    let end = null;
    line.forEach((c,i) => {
      let alreadyAddedToNum = false;
      if(!num && !isNaN(Number(c))){
        num += c;
        //horizontal index from which to start checking for symbols
        start = Math.max(i-1,0);
        alreadyAddedToNum = true;
      }
      if(num){
        if(!isNaN(Number(c)) && !alreadyAddedToNum){
          num += c;
        }
        if(isNaN(Number(c)) || (i === line.length - 1 && num)) {
          //horizontal index at which to stop checking for symbols
          end = i;
          let add = false;
          //check for symbols between start and end on line above, current, and below
          lines[li-1]?.slice(start,end+1).forEach(x => add = add || (isNaN(Number(x)) && x !== '.'));
          line.slice(start,end+1).forEach(x => add = add || (isNaN(Number(x)) && x !== '.'));
          lines[li+1]?.slice(start,end+1).forEach(x => add = add || (isNaN(Number(x)) && x !== '.'));
          if(add) sum += Number(num);
          num = '';
          start = null;
          end = null;
        }
      }
    })
  })
  return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => x.split(''));
  let stars = {};
  lines.forEach((line, li) => {
    let num = '';
    let start = null;
    let end = null;
    line.forEach((c,i) => {
      let alreadyAddedToNum = false;
      if(!num && !isNaN(Number(c))){
        num += c;
        //horizontal index from which to start checking for symbols
        start = Math.max(i-1,0);
        alreadyAddedToNum = true;
      }
      if(num){
        if(!isNaN(Number(c)) && !alreadyAddedToNum){
          num += c;
        }
        if(isNaN(Number(c)) || (i === line.length - 1 && num)) {
          //horizontal index at which to stop checking for symbols
          end = i;
          let add = false;
          //check for * between start and end on line above, current, and below
          lines.slice(Math.max(li-1, 0), Math.min(li+2, lines.length)).forEach((subline,d_li) => 
            subline.slice(start,end+1).forEach((x,d_start) => {
              if(x === '*'){
                let starIndex = `${Math.max(li-1, 0) + d_li},${start + d_start}`;
                if(!stars[starIndex]) {
                  stars[starIndex] = [Number(num)];
                }
                else {
                  stars[starIndex].push(Number(num))
                }
              }
            })
          )
          num = '';
          start = null;
          end = null;
        }
      }
    })
  });
  console.log(stars)
  return Object.values(stars).filter((val) => val?.length === 2).reduce((acc, val) => acc + (val[0]*val[1]), 0);
}

console.log(problem2(input))
