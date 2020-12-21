const input = require('./input').input;
const altInput = require('./input').altInput;


const part1 = (input) => {
  let lines = input.split('\n').map(line => line.split('').filter(x => x !== ' ').join(''));
  let sum = 0;
  lines.forEach((line, i) => {
    while(!Number(line)){
      index = 0;
      while(true){
        let left = line[index];
        let leftSubIndex = 1;
        if(Number(left)){
          while(!isNaN(Number(left + line[index + leftSubIndex]))){
            left = left + line[index + leftSubIndex];
            leftSubIndex += 1;
          }
        }
        let middle = line[index + leftSubIndex];
        let middleSubIndex = 1;
        if(Number(middle)){
          while(!isNaN(Number(middle + line[index + leftSubIndex + middleSubIndex]))){
            middle = middle + line[index + leftSubIndex + middleSubIndex];
            middleSubIndex += 1;
          }
        }
        let right = line[index + leftSubIndex + middleSubIndex];
        let rightSubIndex = 1;
        if(Number(right)){
          while(!isNaN(Number(right + line[index + leftSubIndex + middleSubIndex + rightSubIndex]))){
            right = right + line[index + leftSubIndex + middleSubIndex + rightSubIndex];
            rightSubIndex += 1;
          }
        }

        if(left === '(' && right === ')'){
          line = line.slice(0, index) + middle + line.slice(index + leftSubIndex + middleSubIndex + rightSubIndex);
          break;
        }
        else if(Number(left) && Number(right)){
          line = line.slice(0, index) + `${eval(left + middle + right)}` + line.slice(index + leftSubIndex + 1 + rightSubIndex);
          break;
        }
        else {
          index += leftSubIndex;
          if(index >= line.length - 2){
            break;
          }
        }
      }
      if(i === 3){
        //console.log(line)
      }
    }
    //console.log(Number(line))
    sum += Number(line);
  });
  return sum;
}

let testIn = `2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`

console.log(part1(input))

const part2 = (input) => {
  let lines = input.split('\n').map(line => line.split('').filter(x => x !== ' ').join(''));
  let sum = 0;
  lines.forEach((line, i) => {
    // if(i === 74){
       console.log(line)
    // }
    let evaluateProducts = false;
    while(!Number(line)){
      index = 0;
      while(true){
        let left = line[index];
        let leftSubIndex = 1;
        if(Number(left)){
          while(!isNaN(Number(left + line[index + leftSubIndex]))){
            left = left + line[index + leftSubIndex];
            leftSubIndex += 1;
          }
        }
        let middle = line[index + leftSubIndex];
        let middleSubIndex = 1;
        if(Number(middle)){
          while(!isNaN(Number(middle + line[index + leftSubIndex + middleSubIndex]))){
            middle = middle + line[index + leftSubIndex + middleSubIndex];
            middleSubIndex += 1;
          }
        }
        let right = line[index + leftSubIndex + middleSubIndex];
        let rightSubIndex = 1;
        if(Number(right)){
          while(!isNaN(Number(right + line[index + leftSubIndex + middleSubIndex + rightSubIndex]))){
            right = right + line[index + leftSubIndex + middleSubIndex + rightSubIndex];
            rightSubIndex += 1;
          }
        }
        //console.log(left, middle, right)
        if(left === '(' && right === ')'){
          //console.log('squashing')
          line = line.slice(0, index) + middle + line.slice(index + leftSubIndex + middleSubIndex + rightSubIndex);
          evaluateProducts = false;
          break;
        }
        else if(Number(left) && Number(right)){
          if(middle === '+'){
            //console.log('adding')
            line = line.slice(0, index) + `${eval(left + middle + right)}` + line.slice(index + leftSubIndex + 1 + rightSubIndex);
            evaluateProducts = false;
            break;
          }
          else if(middle = '*'){
            let nextOpenParens = line.split('').slice(index).findIndex(x => x === '(');
            let nextCloseParens = line.split('').slice(index).findIndex(x => x === ')');
            let badSegment = (nextOpenParens < nextCloseParens) && (line[index + nextOpenParens - 1] === '+');
            if(evaluateProducts && !badSegment){//(!line.includes('(') || line[index - 1] === '(')){
              //console.log('multiplying')
              line = line.slice(0, index) + `${eval(left + middle + right)}` + line.slice(index + leftSubIndex + 1 + rightSubIndex);
              evaluateProducts = false;
              break;
            }
            else if(line[index - 1] === '(' && line[index + leftSubIndex + 1 + rightSubIndex] === ')'){
              //console.log('multiplying parens')
              line = line.slice(0, index) + `${eval(left + middle + right)}` + line.slice(index + leftSubIndex + 1 + rightSubIndex);
              evaluateProducts = false;
              break;
            }
            else if(left + middle + right === line){
              line = `${eval(left + middle + right)}`;
              break;
            }
            else {
              //console.log('proceeding')
              index += leftSubIndex;
              if(index >= line.length - 2){
                evaluateProducts = true;
                break;
              }
            }
          }
        }
        else {
          //console.log('proceeding')
          index += leftSubIndex;
          if(index >= line.length - 2){
            evaluateProducts = true;
            break;
          }
        }
      }
      // if(i === 74){
         console.log(line)
      // }
    }
    //console.log('******************')
    //console.log(line)
    sum += Number(line);
  });
  return sum;
}

let testIn2 = `1 + (2 * 3) + (4 * (5 + 6))
2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`

console.log(part2(`(1*2*3*4*5*6)+2*3`))
