import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n\n');
  const inputs = lines[0].split(',');
  let realboards = [];
  let boards = lines.slice(1).map(
    board => board
      .split(' ').filter(x => x).join(',')
      .split('\n').filter(x => x).join(',')
      .split(',').filter(x => x)
  );
  boards = boards
  .map(board => {
    const newboard = [];
    for(let i = 0; i<=4; i++){
      newboard.push(board.slice(i*5, i*5+5));
      newboard.push([board[i], board[i+5], board[i+10], board[i+15], board[i+20]])
    }
    newboard.push([board[0], board[6], board[12], board[18], board[24]])
    newboard.push([board[4], board[8], board[12], board[16], board[20]])
    newboard.forEach((row, i) => {
      newboard[i] = newboard[i].map(val => {
        return {
          val: val,
          marked: 0,
        }
      })
    });
    realboards.push(newboard)
  });

  let winningBoard = null;
  let winningNum = null;
  inputs.forEach(num => {
    realboards.forEach(board => {
      if(!winningBoard){
        board.forEach(row => {
          row.forEach(val => {
            if(val.val === num){
              val.marked = 1
            }
          })
          if(row.reduce((a,b) => a + b.marked, 0) === 5){
            winningBoard = board;
            winningNum = num;
          }
        })
      }
    })
  });
  let unmarkedSum = 0;
  let countedInSum = [];
  winningBoard.forEach(row => {
    row.forEach(val => {
      if(!val.marked && !countedInSum.includes(val.val)){
        unmarkedSum += Number(val.val);
        countedInSum.push(val.val);
      }
    })
  })
  return winningNum * unmarkedSum
}

//console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n\n');
  const inputs = lines[0].split(',');
  let realboards = [];
  let boards = lines.slice(1).map(
    board => board
      .split(' ').filter(x => x).join(',')
      .split('\n').filter(x => x).join(',')
      .split(',').filter(x => x)
  );
  boards = boards
  .map(board => {
    const newboard = {hasWon: false, board: []};
    for(let i = 0; i<=4; i++){
      newboard.board.push(board.slice(i*5, i*5+5));
      newboard.board.push([board[i], board[i+5], board[i+10], board[i+15], board[i+20]])
    }
    newboard.board.push([board[0], board[6], board[12], board[18], board[24]])
    newboard.board.push([board[4], board[8], board[12], board[16], board[20]])
    newboard.board.forEach((row, i) => {
      newboard.board[i] = newboard.board[i].map(val => {
        return {
          val: val,
          marked: 0,
        }
      })
    });
    realboards.push(newboard)
  });
  let lastWinningBoard = null;
  let winningNum = null;
  inputs.forEach(num => {
    realboards.forEach(board => {
      if(!board.hasWon){
        board.board.forEach(row => {
          row.forEach(val => {
            if(val.val === num){
              val.marked = 1
            }
          })
          if(row.reduce((a,b) => a + b.marked, 0) === 5){
            lastWinningBoard = board;
            board.hasWon = true;
            winningNum = num;
          }
        })
      }
    })
  });
  let unmarkedSum = 0;
  let countedInSum = [];
  console.log(lastWinningBoard.board)
  lastWinningBoard.board.forEach(row => {
    row.forEach(val => {
      if(!val.marked && !countedInSum.includes(val.val)){
        unmarkedSum += Number(val.val);
        countedInSum.push(val.val);
      }
    })
  })
  return winningNum * unmarkedSum
}

console.log(problem2(input))
