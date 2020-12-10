const input = require('./input').input;

const getAccValueBeforeLoop = (input) => {
  let code = input.split('\n');
  code = code.map(i => {
    return {
      instruction: i.split(' ')[0],
      value: Number(i.split(' ')[1]),
      executed: false,
    }
  });
  let accumulator = 0;
  let index = 0;
  while(!code[index].executed){
    code[index].executed = true;
    if(code[index].instruction === 'jmp'){
      index += code[index].value;
   }
    else {
      if(code[index].instruction === 'acc'){
        accumulator += code[index].value;
      }
      index += 1;
    }
  }
  return accumulator;
}

console.log(getAccValueBeforeLoop(input))

const doesItLoop = (code, accumulator, index) => {
  let broken = false;
  while(!code[index].executed){
    code[index].executed = true;
    if(code[index].instruction === 'jmp'){
      index += code[index].value;
    }
    else {
      if(code[index].instruction === 'acc'){
        accumulator += code[index].value;
      }
      index += 1;
    }
    if(index === code.length){
      broken = true;
      break;
    }
  }
  return {loop: !broken, acc: accumulator};
}

const fixCode = (input) => {
  let code = input.split('\n');
  code = code.map(i => {
    return {
      instruction: i.split(' ')[0],
      value: Number(i.split(' ')[1]),
      executed: false,
    }
  });
  let index = 0;
  let accumulator = 0;
  while(true){
    if(code[index].instruction === 'nop'){
      if(index + code[index].value === code.length){
        code[index].instruction = 'jmp';
        break;
      }
      let testInstruction = {
        instruction: 'jmp',
        value: code[index].value,
        executed: true
      };
      let testCode = [
        ...code.slice(0, index).map(t => {
          return {
            instruction: t.instruction,
            value: t.value,
            executed: t.executed
          }
        }),
        testInstruction,
        ...code.slice(index + 1).map(t => {
          return {
            instruction: t.instruction,
            value: t.value,
            executed: t.executed
          }
        })
      ];
      let testIndex = index + code[index].value;
      let loopTest = doesItLoop(testCode, accumulator, testIndex);
      if(!loopTest.loop){
        accumulator = loopTest.acc;
        break;
      }
      else {
        index += 1;
      }
    }
    else if(code[index].instruction === 'jmp'){
      if(index === code.length - 1){
        code[index].instruction = 'nop';
        break;
      }
      let testInstruction = {
        instruction: 'nop',
        value: code[index].value,
        executed: true
      };
      let testCode = [
        ...code.slice(0, index).map(t => {
          return {
            instruction: t.instruction,
            value: t.value,
            executed: t.executed
          }
        }),
        testInstruction,
        ...code.slice(index + 1).map(t => {
          return {
            instruction: t.instruction,
            value: t.value,
            executed: t.executed
          }
        })
      ];
      let testIndex = index + 1;
      let loopTest = doesItLoop(testCode, accumulator, testIndex);
      if(!loopTest.loop){
        accumulator = loopTest.acc;
        break;
      }
      else {
        index += code[index].value;
      }
    }
    else {
      accumulator += code[index].value;
      index += 1;
    }
  }
  return accumulator;
}

console.log(fixCode(input))
