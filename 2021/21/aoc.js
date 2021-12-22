import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

let newInput = [4,8]

getInputforDay(input, filePath)

const problem = (input) => {
  let p1 = {
    pos: input[0],
    score: 0,
  }
  let p2 = {
    pos: input[1],
    score: 0,
  };

  let rolls = 0;
  let dieStart = 1;

  while(true){
    let rollTotal = (dieStart > 100 ? dieStart - 100 : dieStart) +
                ((dieStart + 1) > 100 ? (dieStart + 1) - 100 : (dieStart + 1)) +
                ((dieStart + 2) > 100 ? (dieStart + 2) - 100 : (dieStart + 2));
    p1.pos = p1.pos + rollTotal;
    p1.pos = p1.pos > 10 ? p1.pos - 10*Math.floor(p1.pos / 10) : p1.pos;
    p1.pos = p1.pos === 0 ? 10 : p1.pos;
    dieStart = (dieStart + 3 > 100) ? dieStart - 97 : (dieStart + 3);
    rolls += 3;
    p1.score += p1.pos;
    if(p1.score >= 1000){
      break;
    }

    rollTotal = (dieStart > 100 ? dieStart - 100 : dieStart) +
                ((dieStart + 1) > 100 ? (dieStart + 1) - 100 : (dieStart + 1)) +
                ((dieStart + 2) > 100 ? (dieStart + 2) - 100 : (dieStart + 2));
    p2.pos = p2.pos + rollTotal;
    p2.pos = p2.pos > 10 ? p2.pos - 10*Math.floor(p2.pos / 10) : p2.pos;
    p2.pos = p2.pos === 0 ? 10 : p2.pos;
    dieStart = (dieStart + 3 > 100) ? dieStart - 97 : (dieStart + 3);
    rolls += 3;
    p2.score += p2.pos;
    if(p2.score >= 1000){
      break;
    }
  }

  return ((p1.score >= 1000 ? p2.score : p1.score) * rolls)
}

console.log(problem(newInput))

const problem2 = (p1Start, p2Start) => {
  let p1 = {
    posScoreFreq: [{}],
  }
  let p2 = {
    posScoreFreq: [{}],
  };
  //in game round 0 at position p1Start, p1 has a score of 0 in 1 game
  p1.posScoreFreq[0][p1Start] = {0:1};
  p2.posScoreFreq[0][p2Start] = {0:1};

  let p1Wins = 0;
  let p2Wins = 0;
  let round = 0;
  //all 27 universes that split from every roll
  let rollFreqs = {3:1, 4:3, 5:6, 6:7, 7:6, 8:3, 9:1};
  while(true){
    round++;
    p1.posScoreFreq[round] = {};
    let allGamesDone = true;
    Object.entries(rollFreqs).forEach(([roll, rfreq]) => {
      roll = Number(roll);
      Object.entries(p1.posScoreFreq[round - 1]).forEach(([pos, scorefreq]) => {
        pos = Number(pos);
        let newPos = ((pos + roll) > 10) ? (pos + roll - 10) : pos + roll;
        p1.posScoreFreq[round][newPos] = p1.posScoreFreq[round][newPos] || {};
        let ongoingGames = Object.entries(scorefreq).filter(([score, sfreq]) => Number(score) < 21);
        allGamesDone = allGamesDone && (ongoingGames.length === 0);
        ongoingGames.forEach(([score, sfreq]) => {
          let newScore = Number(score) + newPos;
          let scoreFreq = (rfreq * sfreq) + (p1.posScoreFreq[round][newPos][newScore] || 0);
          p1.posScoreFreq[round][newPos][newScore] = scoreFreq;
          if(newScore >= 21){
            p1Wins += scoreFreq;
          }
        })
      });
    });
    if(allGamesDone) {
      console.log('p1 finished all their games on round ', round)
      break;
    }

    allGamesDone = false;
    p2.posScoreFreq[round] = {};
    Object.entries(rollFreqs).forEach(([roll, rfreq]) => {
      roll = Number(roll);
      Object.entries(p2.posScoreFreq[round - 1]).forEach(([pos, scorefreq]) => {
        pos = Number(pos);
        let newPos = ((pos + roll) > 10) ? (pos + roll - 10) : pos + roll;
        p2.posScoreFreq[round][newPos] = p2.posScoreFreq[round][newPos] || {};
        let ongoingGames = Object.entries(scorefreq).filter(([score, sfreq]) => Number(score) < 21);
        allGamesDone = allGamesDone && (ongoingGames.length === 0);
        ongoingGames.forEach(([score, sfreq]) => {
          let newScore = Number(score) + newPos;
          let scoreFreq = (rfreq * sfreq) + (p2.posScoreFreq[round][newPos][newScore] || 0);
          p2.posScoreFreq[round][newPos][newScore] = scoreFreq;
          if(newScore >= 21){
            p2Wins += scoreFreq;
          }
        })
      })
    });
    if(allGamesDone) {
      console.log('p2 finished all their games on round ', round)
      break;
    }

    console.log(JSON.stringify(p2, null, 4))
  }
  console.log()
  return Math.max(p1Wins, p2Wins)
}

// console.log(problem2(...newInput))

const problem2alt = (p1Start, p2Start) => {
  let round = 0;
  let ongoingGames = {0: {}};
  ongoingGames[round][encodeKey(p1Start, p2Start, 0, 0)] = 1;

  let p1Wins = 0;
  let p2Wins = 0;
  //all 27 universes that split from every roll
  let rollFreqs = {3:1, 4:3, 5:6, 6:7, 7:6, 8:3, 9:1};
  while(true){
    let shouldBreak = true;
    round++;
    ongoingGames[round] = {};
    Object.entries(ongoingGames[round - 1]).forEach(([encodedState, stateFreq]) => {
      let state = decodeKey(encodedState);
      if(Math.max(state.p1Score, state.p2Score) >= 21){
        console.log('21 game found')
      }
      Object.entries(rollFreqs).forEach(([p1Roll, p1Rfreq]) => {
        p1Roll = Number(p1Roll);
        let newP1Pos = state.p1Pos + p1Roll
        newP1Pos -= (newP1Pos > 10) ? 10 : 0;
        let newP1Score = state.p1Score + newP1Pos;
        if(newP1Score >= 21){
          p1Wins += stateFreq*p1Rfreq;
        }
        else {
          Object.entries(rollFreqs).forEach(([p2Roll, p2Rfreq]) => {
            p2Roll = Number(p2Roll);
            let newP2Pos = state.p2Pos + p2Roll
            newP2Pos -= (newP2Pos > 10) ? 10 : 0;
            let newP2Score = state.p2Score + newP2Pos;
            let newStateFreq = stateFreq*p1Rfreq*p2Rfreq;
            if(newP2Score >= 21){
              p2Wins += newStateFreq;
            }
            else {
              shouldBreak = false;
              let encodedKey = encodeKey(newP1Pos, newP2Pos, newP1Score, newP2Score);
              ongoingGames[round][encodedKey] = (ongoingGames[round][encodedKey] || 0) + newStateFreq;
            }
          });
        }
      });
    })
    if(shouldBreak) break;
  }
  console.log(p1Wins, p2Wins)
  return Math.max(p1Wins, p2Wins)
}

function encodeKey(p1Pos, p2Pos, p1Score, p2Score) {
  let args = [...arguments];
  return args.join('-');
}

function decodeKey(key) {
  let args = key.split('-').map(Number);
  return {
    p1Pos: args[0],
    p2Pos: args[1],
    p1Score: args[2],
    p2Score: args[3]
  }
}

console.log(problem2alt(...newInput))
