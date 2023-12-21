import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath);

let dirMap = {
  left: ['up', 'left', 'down'],
  right: ['up', 'right', 'down'],
  up: ['up', 'left', 'right'],
  down: ['right', 'left', 'down']
}

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map((line,y) => {
    return line.split('').map((spot,x) => ({
      heat: Number(spot),
      bestTotalSoFar: {
        up: {1: Infinity, 2: Infinity, 3: Infinity},
        right: {1: Infinity, 2: Infinity, 3: Infinity},
        down: {1: Infinity, 2: Infinity, 3: Infinity},
        left: {1: Infinity, 2: Infinity, 3: Infinity}
      }
    }))
  });
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      spot.x = x;
      spot.y = y;
      spot.up = lines[y-1] ? lines[y-1][x] : null;
      spot.down = lines[y+1] ? lines[y+1][x] : null;
      spot.left = line[x-1] || null;
      spot.right = line[x+1] || null;
    })
  });

  let currents = [
    {
      spot: lines[0][0].right, 
      dir: 'right', 
      straight: {
        right: 1,
      },
      totalHeat: lines[0][0].right.heat
    },
    {
      spot: lines[0][0].down, 
      dir: 'down', 
      straight: {
        down: 1
      },
      totalHeat: lines[0][0].down.heat
    }
  ];

  while(currents.length){
    let newCurrents = [];
    currents.forEach(current => {
      dirMap[current.dir]
        .filter(dir => (current.straight[dir] || 0) < 3)
        .forEach(validDir => {
          let spot = current.spot[validDir];
          if(spot){
            let possibleNewCurrent = {
              spot,
              dir: validDir,
              straight: {}
            };
            let newTotal = current.totalHeat + possibleNewCurrent.spot.heat;
            let straightCount = (current.straight[validDir] || 0) + 1;
            possibleNewCurrent.straight[validDir] = straightCount;
            if(newTotal < possibleNewCurrent.spot.bestTotalSoFar[validDir][straightCount]){
              possibleNewCurrent.spot.bestTotalSoFar[validDir][straightCount] = newTotal;
              possibleNewCurrent.totalHeat = newTotal;
              newCurrents.push(possibleNewCurrent);
            }
          }
        })
    })
    currents = newCurrents;
  };
  return Math.min(
    ...Object.values(lines.slice(-1)[0].slice(-1)[0].bestTotalSoFar)
      .map(v => Math.min(...Object.values(v)))
  );
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map((line,y) => {
    return line.split('').map((spot,x) => ({
      heat: Number(spot),
      bestTotalSoFar: {
        up: {1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5: Infinity, 6: Infinity, 7: Infinity, 8: Infinity, 9: Infinity, 10: Infinity},
        right: {1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5: Infinity, 6: Infinity, 7: Infinity, 8: Infinity, 9: Infinity, 10: Infinity},
        down: {1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5: Infinity, 6: Infinity, 7: Infinity, 8: Infinity, 9: Infinity, 10: Infinity},
        left: {1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5: Infinity, 6: Infinity, 7: Infinity, 8: Infinity, 9: Infinity, 10: Infinity}
      }
    }))
  });
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      spot.x = x;
      spot.y = y;
      spot.up = lines[y-1] ? lines[y-1][x] : null;
      spot.down = lines[y+1] ? lines[y+1][x] : null;
      spot.left = line[x-1] || null;
      spot.right = line[x+1] || null;
    })
  });

  let currents = [
    {
      spot: lines[0][0].right, 
      dir: 'right', 
      straight: {
        right: 1,
      },
      totalHeat: lines[0][0].right.heat
    },
    {
      spot: lines[0][0].down, 
      dir: 'down', 
      straight: {
        down: 1
      },
      totalHeat: lines[0][0].down.heat
    }
  ];
  let goal = lines.slice(-1)[0].slice(-1)[0];

  while(currents.length){
    let newCurrents = [];
    currents.forEach(current => {
      let validDirs = [];
      if(current.straight[current.dir] < 4){
        validDirs.push(current.dir);
      }
      else {
        validDirs = dirMap[current.dir]
          .filter(dir => (current.straight[dir] || 0) < 10)
      }
      validDirs.forEach(validDir => {
          let spot = current.spot[validDir];
          if(spot){
            let possibleNewCurrent = {
              spot,
              dir: validDir,
              straight: {}
            };
            let newTotal = current.totalHeat + possibleNewCurrent.spot.heat;
            let straightCount = (current.straight[validDir] || 0) + 1;
            possibleNewCurrent.straight[validDir] = straightCount;
            if((spot === goal && straightCount >= 4) || spot !== goal){
              if(newTotal < possibleNewCurrent.spot.bestTotalSoFar[validDir][straightCount]){
                possibleNewCurrent.spot.bestTotalSoFar[validDir][straightCount] = newTotal;
                possibleNewCurrent.totalHeat = newTotal;
                newCurrents.push(possibleNewCurrent);
              }
            }
          }
        })
    })
    currents = newCurrents;
  };
  return Math.min(
    ...Object.values(goal.bestTotalSoFar)
      .map(v => Math.min(...Object.values(v)))
  );
}

console.log(problem2(input))
