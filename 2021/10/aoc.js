import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let rows = input.split('\n').map(x => x.split(''));
  const map = {
    '<':'>',
    '(':')',
    '[':']',
    '{':'}'
  };
  const outMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }
  const opens = '<([{';
  const closes = '>)]}';
  let outTotal = 0;
  rows.forEach(line => {
    let stack = [];
    let lineDead = false;
    line.forEach((x,i) => {
      if(opens.includes(x)){
        stack.push(x);
      }
      else {
        if(stack.length && map[stack[stack.length - 1]] === x){
          stack.pop();
        }
        else if(!lineDead){
          lineDead = true;
          outTotal += outMap[x]
        }
      }
    })
  })
  return outTotal
}

console.log(problem(input))

const problem2 = (input) => {
  let rows = input.split('\n').map(x => x.split(''));
  const map = {
    '<':'>',
    '(':')',
    '[':']',
    '{':'}'
  };
  const outMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  const opens = '<([{';
  const closes = '>)]}';
  let outTotal = 0;
  let incompleteLineScores = [];
  rows.forEach(line => {
    let stack = [];
    let lineDead = false;
    let score = 0;
    line.forEach((x,i) => {
      if(opens.includes(x)){
        stack.push(x);
      }
      else {
        if(stack.length && map[stack[stack.length - 1]] === x){
          stack.pop();
        }
        else if(!lineDead){
          lineDead = true;
        }
      }
    });
    if(!lineDead && stack.length){
      stack.reverse().forEach(x => {
        score = score * 5 + outMap[map[x]];
      })
      incompleteLineScores.push(score);
    }
  })

  incompleteLineScores = incompleteLineScores.sort((a,b) => a-b);
  return incompleteLineScores[(incompleteLineScores.length - 1)/2]
}

console.log(problem2(input))
