import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').map(line => {
    return line.split('').map(x => isNaN(Number(x)) ? x : Number(x));
  });
  //console.log(lines,'\n\n')
  let current = lines[0];
  for(let i = 1; i < lines.length; i++){
    //console.log(i)
    let sum = ['[', ...current,',',...lines[i],']'];
    //console.log(current.join(''),'\n')
    //console.log(lines[i].join(''),'\n')
    //console.log(sum.join(''),'\n')
    let explodeStart = getExplodeStart(sum);
    let maxNumInSum = Math.max(...sum.filter(Number));
    while(explodeStart || maxNumInSum > 9){
      if(explodeStart){
        let explodeLeft = sum[explodeStart + 1];
        let explodeRight = sum[explodeStart + 3];
        //console.log('start index ', explodeStart, explodeLeft, explodeRight);

        let leftSide = sum.slice(0,explodeStart).reverse();
        let leftNumIndex = Math.abs(
          leftSide.findIndex(s => !isNaN(Number(s))) - (explodeStart - 1)
        );
        if(leftNumIndex >= 0){
          //console.log('replacing ', sum[leftNumIndex], ' at ', leftNumIndex, ' with ', explodeLeft)
          sum[leftNumIndex] = sum[leftNumIndex] + explodeLeft;
        }

        sum = [...sum.slice(0, explodeStart), 0, ...sum.slice(explodeStart + 5)];

        let rightNumIndex = sum.findIndex((s,si) =>
          !isNaN(Number(s)) && si > explodeStart
        );
        if(rightNumIndex >= 0){
          //console.log('replacing ', sum[rightNumIndex], ' at ', rightNumIndex, ' with ', Number(sum[rightNumIndex]) + explodeRight)
          sum[rightNumIndex] = sum[rightNumIndex] + explodeRight;
        }
        //console.log(sum.join(''), '\n\n')
        explodeStart = getExplodeStart(sum);
      }

      if(!explodeStart){
        let splitIndex = sum.findIndex(s => !isNaN(Number(s)) && s > 9);
        if(splitIndex >= 0){
          //console.log('splitting now at index ',splitIndex, ' with number ', sum[splitIndex])
          let splitNum = [
            '[',
            Math.floor(sum[splitIndex] / 2),
            ',',
            Math.ceil(sum[splitIndex] / 2),
            ']'
          ];
          sum = [
            ...sum.slice(0,splitIndex),
            ...splitNum,
            ...sum.slice(splitIndex + 1)
          ];
          //console.log(sum.join(''), '\n\n')
          explodeStart = getExplodeStart(sum);
          //console.log('explode start after split: ', explodeStart)
        }
      }
      maxNumInSum = Math.max(...sum.filter(Number));
    }
    current = sum;
  }
  //console.log(current)

  while(current.length > 1){
    let magnitudeStart = current.findIndex((c, ci) => {
      return !isNaN(Number(c)) &&
      current[ci+1] === ',' &&
      !isNaN(Number(current[ci+2]))
    });
    current = [
      ...current.slice(0, magnitudeStart-1),
      (3*current[magnitudeStart]) + (2*current[magnitudeStart+2]),
      ...current.slice(magnitudeStart+4)
    ];
  }
  return current[0]
}

const getExplodeStart = (sum, log = false) => {
  let explodeStart = null;
  let nestDepth = 0;
  sum.forEach((s,si) => {
    if(log) console.log(si, s)
    if(explodeStart === null){
      if(s==='[') {
        nestDepth++;
        if(nestDepth === 5){
          explodeStart = si;
        }
      }
      else if(s===']'){
        nestDepth--;
      }
      if(log) console.log(nestDepth)
    }
  });
  return explodeStart;
}

console.log(problem(input, test))

const problem2 = (input) => {
  let lines = input.split('\n');
  let max = 0;
  for(let first = 0; first <= lines.length - 2; first++){
    for(let second = first+1; second <= lines.length - 1; second++){
      let testInput = [lines[first], lines[second]]
      let sum = problem(testInput.join('\n'));
      if(sum > max){
        max = sum;
      }

      testInput = [lines[second], lines[first]];
      sum = problem(testInput.join('\n'));
      if(sum > max){
        max = sum;
      }
    }
  }
  return max;
}

console.log(problem2(input))
