import { input, test, test2 } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let rocks = [
    [
      ['', '', '#', '#', '#', '#', '']
    ],
    [
      ['', '', '', '#', '', '', ''],
      ['', '', '#', '#', '#', '', ''],
      ['', '', '', '#', '', '', '']
    ],
    [
      ['', '', '', '', '#', '', ''],
      ['', '', '', '', '#', '', ''],
      ['', '', '#', '#', '#', '', '']
    ],
    [
      ['', '', '#', '', '', '', ''],
      ['', '', '#', '', '', '', ''],
      ['', '', '#', '', '', '', ''],
      ['', '', '#', '', '', '', '']
    ],
    [
      ['', '', '#', '#', '', '', ''],
      ['', '', '#', '#', '', '', ''],
    ],
  ];
  let count = 0;
  let inputPos = 0;
  let highest = 0;
  let stack = [['#','#','#','#','#','#','#']];
  while(count <= 2021){
    let rock = rocks[count%5].map(r => ([...r]));
    let reverseRock = rock.map(r => [...r]).reverse();
    let rockPos = highest + 4;
    let done = false;
    while(!done){
      let stackSlice = stack.slice(rockPos, rockPos + rock.length);
      while(stackSlice.length !== rock.length){
        stackSlice.push(['', '', '', '', '', '', '']);
      }
      if(input[inputPos] === '>'){
        let canMoveRight = true;
        reverseRock.forEach((r,i) => {
          r.forEach((pixel, j) => {
            if(pixel && (j === 6 || stackSlice[i][j+1])){
              canMoveRight = false
            }
          })
        })
        if(canMoveRight){
          reverseRock.forEach((r,i) => r.unshift(r.pop()));
        }
      }
      else {
        let canMoveLeft = true;
        reverseRock.forEach((r,i) => {
          r.forEach((pixel, j) => {
            if(pixel && (j === 0 || stackSlice[i][j-1])){
              canMoveLeft = false
            }
          })
        })
        if(canMoveLeft){
          reverseRock.forEach((r,i) => r.push(r.shift()));
        }
      }
      inputPos = (inputPos + 1)%input.length;
      let shouldFall = true;
      if(rockPos <= highest + 1){
        reverseRock.forEach((r, i) => {
          if((rockPos + i <= highest + 1) && shouldFall){
            r.forEach((pixel, j) => {
              if(pixel && stack[rockPos + i - 1][j] && shouldFall){
                shouldFall = false;
              }
            })
          }
        })
      }
      if(shouldFall){
        rockPos -= 1;
      }
      else {
        for(let i = rockPos; i < rockPos + rock.length; i++){
          if(!stack[i]){
            stack[i] = reverseRock[i - rockPos];
          }
          else {
            stack[i] = reverseRock[i - rockPos].map((r, j) => r || stack[i][j]);
          }
        }
        done = true;
      }
    }
    count++;
    highest = stack.length - 1;
  }
  return highest;
}

console.log(problem(input))

const problem2 = (input) => {
  let rocks = [
    [
      '..####.'
    ],
    [
      '...#...',
      '..###..',
      '...#...'
    ],
    [
      '..###..',
      '....#..',
      '....#..'
    ],
    [
      '..#....',
      '..#....',
      '..#....',
      '..#....',
    ],
    [
      '..##...',
      '..##...',
    ],
  ];
  let count = 0;
  let inputPos = 0;
  let highest = 0;
  let stack = ['#######'];
  let amountCut = 0;

  let blockIndexAndInputIndexAndStackTopTriplets = [];

  let blockCountAtFirstCycleStart;
  let cycleBlockCount;
  let heightAtFirstCycleStart;
  let cycleHeight;
  let fullCyclesBeforeTrillion;
  let remainingBlocksAfterLastCycle;
  let heightAtFirstCycleEnd;
  let heightAfterFirstCyclePlusRemainder;
  let heightOfRemainderStack;
  let remainderTracker = Infinity;
  while(remainderTracker){
    let rock = [...rocks[count%5]];
    if(remainderTracker === Infinity){
      let blockIndexAndInputIndexAndStackTopTriplet = [`${[...stack].reverse().slice(0,20).join('\n ')}-${count%5}-${inputPos}`, count, highest];
      let existing = blockIndexAndInputIndexAndStackTopTriplets.find(x => x[0] === blockIndexAndInputIndexAndStackTopTriplet[0])
      if(!existing){
        blockIndexAndInputIndexAndStackTopTriplets.push(blockIndexAndInputIndexAndStackTopTriplet);
      }
      else {
        blockCountAtFirstCycleStart = existing[1];
        cycleBlockCount = count - blockCountAtFirstCycleStart;
        heightAtFirstCycleStart = existing[2];
        cycleHeight = highest - heightAtFirstCycleStart;
        fullCyclesBeforeTrillion = Math.floor((1000000000000 - blockCountAtFirstCycleStart) / cycleBlockCount);
        remainingBlocksAfterLastCycle = 1000000000000 - (fullCyclesBeforeTrillion * cycleBlockCount) - blockCountAtFirstCycleStart;
        heightAtFirstCycleEnd = highest;
        remainderTracker = remainingBlocksAfterLastCycle;
      }
    }
    let rockPos = highest + 4 - amountCut;
    let done = false;
    while(!done){
      let stackSlice = stack.slice(rockPos, rockPos + rock.length);
      while(stackSlice.length !== rock.length){
        stackSlice.push('.......');
      }
      if(input[inputPos] === '>'){
        let canMoveRight = true;
        rock.forEach((r,i) => {
          for(let j = 0; j < 7; j++){
            if(r[j] === '#' && (j === 6 || stackSlice[i][j+1] === '#')){
              canMoveRight = false;
            }
          }
        })
        if(canMoveRight){
          rock = rock.map((r) => ('.' + r.slice(0,-1)));
        }
      }
      else {
        let canMoveLeft = true;
        rock.forEach((r,i) => {
          for(let j = 0; j < 7; j++){
            if(r[j]==='#' && (j === 0 || stackSlice[i][j-1] === '#')){
              canMoveLeft = false;
            }
          }
        })
        if(canMoveLeft){
          rock = rock.map((r) => r.slice(1) + '.');
        }
      }
      inputPos = (inputPos + 1)%input.length;
      let shouldFall = true;
      if(rockPos <= highest - amountCut + 1){
        //if(count === 918) console.log(rockPos, highest)
        rock.forEach((r, i) => {
          if((rockPos + i <= highest - amountCut + 1) && shouldFall){
            for(let j = 0; j < 7; j++){
              //if(count === 918) console.log([...stack].reverse().join('\n'), stack[rockPos + i - 1], i, j, rockPos)
              if(r[j] === '#' && stack[rockPos + i - 1][j] === '#' && shouldFall){
                shouldFall = false;
              }
            }
          }
        })
      }
      if(shouldFall){
        rockPos -= 1;
      }
      else {
        for(let i = rockPos; i < rockPos + rock.length; i++){
          if(!stack[i]){
            stack[i] = rock[i - rockPos];
          }
          else {
            for(let j = 0; j < 7; j++){
              stack[i] = stack[i].slice(0,j) +
                         (stack[i][j] === '#' ? '#' : rock[i - rockPos][j]) +
                         stack[i].slice(j+1);
            }
          }
        }
        done = true;
      }
    }
    count++;
    remainderTracker--;
    if(remainderTracker === 0){
      heightAfterFirstCyclePlusRemainder = highest;
      heightOfRemainderStack = heightAfterFirstCyclePlusRemainder - heightAtFirstCycleEnd;
    }
    highest = stack.length - 1 + amountCut;
    let shouldCut = true;
    let reverseStack = [...stack].reverse();
    let depthToBedrock = branchDownToLowestRock(
      reverseStack,
      reverseStack[0].split('').map((x,i) => x === '.' ? i : undefined).filter(x => x !== undefined)
    );
    let amountToCut = stack.length - depthToBedrock - 1;
    amountCut += amountToCut;
    stack = stack.slice(amountToCut)
  }
  return heightAtFirstCycleStart + (fullCyclesBeforeTrillion * cycleHeight) + heightOfRemainderStack + 1;
}

const branchDownToLowestRock = (stack, branchFromThese, deepestSoFar = 1) => {
  //console.log('branching from ', branchFromThese)
  let newBranchFromThese = [];
  branchFromThese.forEach((b) => {
    if(stack[1][b] === '.'){
      newBranchFromThese.push(b)
    }
  })
  let totalEmptyInRow = stack[1].split('').filter(x => x === '.').length
  //console.log('testing branching from ', newBranchFromThese)
  if(newBranchFromThese.length){
    let newNewBranchFromThese = [...newBranchFromThese];
    let done = false;
    for(let n of newBranchFromThese) {
      //console.log(n)
      let horizontalBranch = 0;
      let stopLeft = false;
      let stopRight = false;
      while(!(stopLeft && stopRight) && !done){
        horizontalBranch++;
        if(stack[1][n-horizontalBranch] === '.' && !stopLeft && !newNewBranchFromThese.includes(n-horizontalBranch)){
          newNewBranchFromThese.push(n-horizontalBranch);
          if(newNewBranchFromThese.length === totalEmptyInRow){
            done = true;
            break;
          }
        }
        else {
          stopLeft = true;
        }
        if(stack[1][n+horizontalBranch] === '.' && !stopRight && !newNewBranchFromThese.includes(n+horizontalBranch)){
          newNewBranchFromThese.push(n+horizontalBranch);
          if(newNewBranchFromThese.length === totalEmptyInRow){
            done = true;
            break;
          }
        }
        else {
          stopRight = true;
        }
      }
      //console.log(newNewBranchFromThese)
      if(done) break;
    };
    //console.log('about to branch from ', newBranchFromThese)
    return branchDownToLowestRock(stack.slice(1), [...new Set(newNewBranchFromThese)], deepestSoFar + 1)
  }
  else {
    return deepestSoFar;
  }
}


console.log(problem2(input))
