const input = require('./input').input;

let inArray = input.split('\n').map(x => Number(x));

const badNumber = (input) => {
  let index = 24;
  let buffer;
  let target;
  while(true){
    index += 1;
    buffer = input.slice(index - 25, index);
    target = input[index];
    let foundComplement = false;
    buffer.forEach(addend => {
      let complement = target - addend;
      if(addend !== complement && buffer.includes(complement)){
        foundComplement = true;
      }
    });
    if(!foundComplement){
      break;
    }
  }
  return target
}

console.log(badNumber(inArray))


const findRange = (input, badNumber) => {
  let startRange = input.slice(0,input.findIndex(x => x === badNumber)).reverse();
  let testStartIndex = -1;
  let finalRange;
  while(true){
    let width = 1;
    testStartIndex += 1;
    let testRange = startRange.slice(testStartIndex, testStartIndex + width);
    while(testRange.reduce((a,b) => a + b) < badNumber){
      width += 1;
      testRange = startRange.slice(testStartIndex, testStartIndex + width);
    }
    if(testRange.reduce((a,b) => a + b) === badNumber){
      finalRange = testRange;
      break;
    }
  }
  console.log(finalRange, finalRange.reduce((a,b) => a + b))
  return Math.min(...finalRange) + Math.max(...finalRange)
}

console.log(findRange(inArray, badNumber(inArray)))
