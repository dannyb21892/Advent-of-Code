//const input = ;//require('./input').input;
let input = [20,9,11,0,1,2];

const part1 = (input) => {//this is literally part 2 solution except shittier and using objects instead of maps
  let current = 2;
  while(input.length < 2020){
    input.reverse();
    let last = input.slice(1).findIndex(x => x === current);
    current = last === -1 ? 0 : (last + 1);
    input.reverse();
    input.push(current);
  }
  return input[2019]
}

let testIn = [0,3,6];
console.log(part1([...input]))

const part2Maps = (input, turnCap) => {
  let currentNumber = input[input.length - 1];
  let turn = input.length;
  let nextNumber = 0; //assumes starting numbers are unique
  let history = new Map();
  input.forEach((number, turn) => {
    history.set(number, turn + 1);
  });

  let timer = 0;
  console.time(`${timer}`)
  while(turn < turnCap){
    if(turn % 1000000 === 0){
      console.timeEnd(`${timer}`)
      timer = timer + 1000000;
      console.time(`${timer}`)
    }
    turn += 1;
    currentNumber = nextNumber;
    let lastTurnCurrentNumberWasSpoken = history.get(currentNumber);
    nextNumber = lastTurnCurrentNumberWasSpoken ? turn - lastTurnCurrentNumberWasSpoken : 0;
    history.set(currentNumber, turn);
  }

  return currentNumber
}

const part2Objects = (input, turnCap) => {
  let currentNumber = input[input.length - 1];
  let turn = input.length;
  let nextNumber = 0; //assumes starting numbers are unique
  let history = {};
  input.forEach((number, turn) => {
    history[number] = turn + 1;
  });

  let timer = 0;
  console.time(`${timer}`)
  while(turn < turnCap){
    if(turn % 1000000 === 0){
      console.timeEnd(`${timer}`)
      timer = timer + 1000000;
      console.time(`${timer}`)
    }
    turn += 1;
    currentNumber = nextNumber;
    let lastTurnCurrentNumberWasSpoken = history[currentNumber];
    nextNumber = lastTurnCurrentNumberWasSpoken ? turn - lastTurnCurrentNumberWasSpoken : 0;
    history[currentNumber] = turn;
  }

  return currentNumber
}


console.log(part2Maps([...input], 30000000))

console.log(part2Objects([...input], 30000000))
