import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

let newIn = {
  xmin: 241,
  xmax: 273,
  ymin: -97,
  ymax: -63,
}

// newIn = {
//   xmin: 20,
//   xmax: 30,
//   ymin: -10,
//   ymax: -5,
// }

const problem = (input) => {
  let xvels = {};
  for(let x = input.xmax; x > 0; x--){
    let sum = 0;
    let add = x;
    let stepNum = 0;
    while(add > 0){
        stepNum++;
        sum += add;
        add--;
        if(sum >= input.xmin && sum <= input.xmax){
            xvels[x] = xvels[x] ? [...xvels[x], stepNum] : [stepNum];
        }
    }
  }
  let yvels = {};
  for(let y = -input.ymin; y >= input.ymin; y--){
    if(y >= input.ymin){
      let sum = 0;
      let add = y;
      let stepNum = 0;
      while(sum >= input.ymin){
          stepNum++;
          sum += add;
          add--;
          if(sum >= input.ymin && sum <= input.ymax){
            yvels[y] = yvels[y] ? [...yvels[y], stepNum] : [stepNum];
          }
      }
    }
    else {
      if(input.ymin <= y && input.ymax >= y){
        yvels[y] = [1];
      }
    }
  }

  let xEntries = Object.entries(xvels);
  let yEntries = Object.entries(yvels);
  console.log(xEntries, yEntries)
  let matches = {};
  xEntries.forEach(([x, xsteps]) => {
    xsteps.forEach(xstep => {
      if(xstep < Number(x)){
        let matching = yEntries.map(([y, ysteps]) => {
          return [y, ysteps.filter(ystep => xstep === ystep)];
        }).filter(x => x[1].length);
        matching.forEach(m => {
          if(!matches[x]){
            matches[x] = [m[0]];
          }
          else if(!matches[x].includes(m[0])){
            matches[x].push(m[0])
          }
        })
        console.log(x, xstep, matching)
      }
      else if(xstep === Number(x)){
        let matching = yEntries.map(([y, ysteps]) => {
          return [y, ysteps.filter(ystep => xstep <= ystep)];
        }).filter(x => x[1].length);
        matching.forEach(m => {
          if(!matches[x]){
            matches[x] = [m[0]];
          }
          else if(!matches[x].includes(m[0])){
            matches[x].push(m[0])
          }
        })
      }
    })
  })

  return Object.values(matches).reduce((a,b) => a + b.length,0)
}

console.log(problem(newIn))

const problem2 = (input) => {

}

console.log(problem2(input))
